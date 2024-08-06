import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { createQuiz, createQuestion } from "@/lib/quizapi";

interface OpenAIResponse {
    quiz: {
        questions: {
            questionText: string;
            answers: {
                answerText: string;
                isCorrect: boolean;
            }[];
        }[];
    };
}

export async function POST(req: NextRequest) {
    const body = await req.formData();
    const document = body.get("pdf");

    try {
        if (!document) {
            return NextResponse.json({ error: "No document uploaded" }, { status: 400 });
        }

        console.log("Starting PDF processing...");

        const pdfLoader = new PDFLoader(document as Blob, {
            parsedItemSeparator: " "
        });
        const docs = await pdfLoader.load();

        const selectedDocuments = docs.filter((doc) => doc.pageContent !== undefined);
        const texts = selectedDocuments.map((doc) => doc.pageContent);

        if (texts.length === 0) {
            throw new Error("No text extracted from PDF");
        }

        const prompt = "given the text which is a summary of the document, generate a quiz based on the text. Return json only that contains a quiz object with fields: questions. The questions is an array of objects with fields: questionText, answers. The answers is an array of objects with fields: answerText, isCorrect.";

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: "OPENAI key not provided" },
                { status: 500 }
            );
        }

        const model = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-4",
        });

        const parser = new JsonOutputFunctionsParser();
        const extractionFunctionSchema = {
            name: "extractor",
            description: "Extracts fields from the output",
            parameters: {
                type: "object",
                properties: {
                    quiz: {
                        type: "object",
                        properties: {
                            questions: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        questionText: { type: "string" },
                                        answers: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    answerText: { type: "string" },
                                                    isCorrect: { type: "boolean" },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        };

        console.log("Preparing to send prompt to OpenAI...");

        const runnable = model
            .bind({
                functions: [extractionFunctionSchema],
                function_call: { name: "extractor" },
            })
            .pipe(parser);

        const message = new HumanMessage({
            content: prompt + "\n" + texts.join("\n")
        });

        console.log("Sending prompt to OpenAI...");
        const result = await runnable.invoke([message]) as OpenAIResponse;
        console.log("OpenAI response received:", result);

        const quizData = result.quiz;

        console.log("Quiz is: ", quizData);

        // Display the quiz questions and answers in the console
        quizData.questions.forEach((question: any, index: number) => {
            console.log(`Question ${index + 1}: ${question.questionText}`);
            question.answers.forEach((answer: any, ansIndex: number) => {
                console.log(`  Answer ${ansIndex + 1}: ${answer.answerText} ${answer.isCorrect ? '(Correct)' : ''}`);
            });
        });

        // Skapa quizen och få quizens ID
        const quizId = await createQuiz();
        console.log("Quiz id is: ", quizId);

        // Skapa endast den första frågan
        if (quizData.questions.length > 0) {
            const firstQuestion = quizData.questions[0];
            const questionId = await createQuestion(firstQuestion.questionText);
            console.log("Question id is: ", questionId);
        }

        return NextResponse.json({ message: "Quiz and first question created successfully" }, { status: 200 });
    } catch (e: any) {
        console.error("Error during quiz generation:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}