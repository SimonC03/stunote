import React from 'react';
import { Quiz } from '@/lib/quizapi';

interface QuizesTableProps {
  quiz: Quiz;
}

const QuizesTable: React.FC<QuizesTableProps> = ({ quiz }) => {
  return (
    <div>
      <h2>Quiz Details</h2>
      <p>Quiz ID: {quiz.$id}</p>
      <h3>Questions:</h3>
      <ul>
        {quiz.questions.map((question) => (
          <li key={question.$id}>
            <p>Question: {question.question}</p>
            <h4>Answers:</h4>
            <ul>
              {question.answers.map((answer) => (
                <li key={answer.$id}>
                  <p>Answer: {answer.answer} (Correct: {answer.isCorrect ? 'Yes' : 'No'})</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizesTable;
