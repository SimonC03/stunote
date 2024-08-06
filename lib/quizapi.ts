import { ID, Query } from 'appwrite';
import { databases } from './appwrite';

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const questionsId = process.env.NEXT_PUBLIC_APPWRITE_QUESTIONS_COLLECTION_ID!;
const quizesId = process.env.NEXT_PUBLIC_APPWRITE_QUIZES_COLLECTION_ID!;
const answersId = process.env.NEXT_PUBLIC_APPWRITE_ANSWERS_COLLECTION_ID!;

export interface Quiz {
    $id: string;
    questions: Question[];
}

export interface Question {
    $id: string;
    question: string;
    answers: Answer[];
}

export interface Answer {
    $id: string;
    answer: string;
    isCorrect: boolean;
}

const handleError = (message: string, error: any) => {
    console.error(message, error);
    throw new Error(message);
};

export const createQuiz = async (): Promise<string> => {
    try {
        // Skapa quiz-dokumentet med en tom array av questions
        const response = await databases.createDocument(
            databaseId,
            quizesId,
            ID.unique(),
            {
                questions: []
            }
        );

        // Returnera ID för det nya quizet
        return response.$id;
    } catch (error) {
        handleError("Failed to create quiz", error);
        return ''; // Returnera en tom sträng vid fel
    }
};

export const createQuestion = async (questionText: string): Promise<string> => {
    try {
        // Skapa frågedokumentet med en tom array av answers
        const response = await databases.createDocument(
            databaseId,
            questionsId,
            ID.unique(),
            {
                question: questionText,
                answers: []
            }
        );

        // Returnera ID för den nya frågan
        return response.$id;
    } catch (error) {
        handleError("Failed to create question", error);
        return ''; // Returnera en tom sträng vid fel
    }
};

export const getQuestionsByQuizId = async (quizId: string): Promise<Question[]> => {
    try {
        console.log(`Fetching questions for quiz with ID: ${quizId}`);
        const quizResponse = await databases.getDocument(databaseId, quizesId, quizId);
        
        console.log('Quiz Response:', quizResponse);

        if (!quizResponse.questions || !Array.isArray(quizResponse.questions)) {
            throw new Error("Quiz does not contain valid questions array");
        }

        const questions: Question[] = [];
        for (const question of quizResponse.questions) {
            const questionId = typeof question === 'string' ? question : question.$id; // Ensure it's an ID
            console.log(`Fetching question with ID: ${questionId}`);
            const questionResponse = await databases.getDocument(databaseId, questionsId, questionId);
            console.log('Question Response:', questionResponse);
            const questionData: Question = {
                $id: questionResponse.$id,
                question: questionResponse.question,
                answers: [] // Initialize with an empty array or fetch answers separately
            };
            questions.push(questionData);
        }
        return questions;
    } catch (error) {
        handleError("Failed to fetch questions for quiz", error);
        return [];
    }
};

export const getAnswersByQuestionId = async (questionId: string): Promise<Answer[]> => {
    try {
        console.log(`Fetching answers for question with ID: ${questionId}`);
        const questionResponse = await databases.getDocument(databaseId, questionsId, questionId);
        
        console.log('Question Response:', questionResponse);

        if (!questionResponse.answer || !Array.isArray(questionResponse.answer)) {
            throw new Error("Question does not contain a valid answer array");
        }

        const answers: Answer[] = [];
        for (const answer of questionResponse.answer) {
            const answerId = typeof answer === 'string' ? answer : answer.$id; // Ensure it's an ID
            console.log(`Fetching answer with ID: ${answerId}`);
            const answerResponse = await databases.getDocument(databaseId, answersId, answerId);
            console.log('Answer Response:', answerResponse);
            const answerData: Answer = {
                $id: answerResponse.$id,
                answer: answerResponse.answer,
                isCorrect: answerResponse.isCorrect
            };
            answers.push(answerData);
        }
        return answers;
    } catch (error) {
        handleError("Failed to fetch answers for question", error);
        return [];
    }
};