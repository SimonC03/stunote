'use client'

import { useUserContext } from '@/context/UserContext';
import { getUserData, UserProfile } from '@/lib/api';
import { getQuestionsByQuizId, getAnswersByQuestionId, Question, Answer, Quiz } from '@/lib/quizapi';
import React, { useEffect, useState } from 'react';
import QuizesTable from '@/components/ui/QuizesTable';
import AdminRoute from '@/components/AdminRoute';

const Dashboard = () => {
  const { user, loading: userLoading } = useUserContext();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.$id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const userData = await getUserData(user.$id);
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleQuizClick = async (quizId: string) => {
    try {
      setLoading(true);
      console.log(`Quiz ID clicked: ${quizId}`);
      const questions = await getQuestionsByQuizId(quizId);
      console.log('Questions:', questions);

      for (const question of questions) {
        console.log(`Fetching answers for question with ID: ${question.$id}`);
        const answers = await getAnswersByQuestionId(question.$id!);
        question.answers = answers;
        console.log(`Answers for question ${question.$id}:`, answers);
      }

      const fullQuiz: Quiz = {
        $id: quizId,
        questions: questions
      };

      setSelectedQuiz(fullQuiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  return (
    <AdminRoute>
        <div className='text-white'>
        <h1 className='font-bold'>Dashboard</h1>
        <h2>Welcome, {userData.userId}</h2>
        <h3>Your Quizzes</h3>
        <ul>
            {userData.quizes.map((quiz) => (
            <li key={quiz.$id}>
                <button onClick={() => handleQuizClick(quiz.$id)}>{quiz.$id}</button>
            </li>
            ))}
        </ul>
        {selectedQuiz && <QuizesTable quiz={selectedQuiz} />}
        </div>
    </AdminRoute>
  );
};

export default Dashboard;
