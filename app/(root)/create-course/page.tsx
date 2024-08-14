'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { databases } from '@/lib/appwrite'; // Justera sökvägen efter behov
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { getSchools } from '@/lib/schools'; // Importera getSchools-funktionen
import { Button } from '@/components/ui/button';
import AdminRoute from '@/components/AdminRoute';
import { Query } from 'appwrite'; // Importera Query från Appwrite SDK
import toast from 'react-hot-toast';

interface CourseFormData {
  courseCode: string;
  courseName: string;
  university: string;
  premium: boolean;
}

const CreateCourse = () => {
  const { register, handleSubmit, reset } = useForm<CourseFormData>();
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Hämta skolor från schoolData och sätt i state
    const schools = getSchools();
    setUniversities(schools);
  }, []);

  const onSubmit: SubmitHandler<CourseFormData> = async (data) => {
    setLoading(true);

    try {
      // Kontrollera om en kurs med samma kurskod, kursnamn och universitet redan finns
      const existingCourses = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, // Byt till ditt databaseId
        process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!, // Byt till din collectionId
        [
          Query.equal('courseCode', data.courseCode),
          Query.equal('courseName', data.courseName),
          Query.equal('university', data.university)
        ]
      );

      if (existingCourses.total > 0) {
        toast.error('The course already exists.');
        setLoading(false);
        return;
      }

      const courseData = {
        courseCode: data.courseCode,
        courseName: data.courseName,
        university: data.university,
        premium: false,
      };

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, // Byt till ditt databaseId
        process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!, // Byt till din collectionId
        'unique()', // Använd 'unique()' för att låta Appwrite generera ett unikt ID
        courseData
      );
      reset();
      router.push(`/`); // Redirect to the course page with the course code
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminRoute>
        <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Course</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">Course Code</label>
                  <input
                    id="courseCode"
                    type="text"
                    {...register('courseCode', { required: true })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
                  <input
                    id="courseName"
                    type="text"
                    {...register('courseName', { required: true })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700">University</label>
                  <select
                    id="university"
                    {...register('university', { required: true })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {universities.map((university, index) => (
                      <option key={index} value={university}>
                        {university}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button
                type="submit"
                variant="default"
                size="default"
                className="w-full py-2 px-4 font-semibold shadow-sm"
                loading={loading}
              >
                Create Course
              </Button>
            </form>
          </div>
        </div>
      </AdminRoute>
    </ProtectedRoute>
  );
};

export default CreateCourse;
