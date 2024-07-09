'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { databases, storage, account } from '@/lib/appwrite'; // Justera sökvägen efter behov
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { Query } from 'appwrite';
import { Button } from '@/components/ui/button';
import AdminRoute from '@/components/AdminRoute';
import toast from 'react-hot-toast';

interface UploadFormData {
  school: string;
  courseId: string;
  documentType: string;
  file: FileList;
  description: string; // Lägg till description här
  examType?: string; // Lägg till examType för att hålla "Tentamen" eller "Dugga"
  examDate?: string; // Lägg till examDate för att hålla datumet
}

const documentTypes = [
  "Examination",
  "Summations",
  "Lectures",
  "Notes",
  "Assignments",
  "Formula collections",
];

const examTypes = [
  "Tentamen",
  "Dugga",
  "Tentamen Solution",
  "Dugga Solution",
];

const UploadPage = () => {
  const { register, handleSubmit, watch, reset } = useForm<UploadFormData>();
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState<string[]>([]);
  const [courses, setCourses] = useState<{ id: string, courseCode: string }[]>([]);
  const [charCount, setCharCount] = useState(0);
  const [descriptionError, setDescriptionError] = useState('');
  const [isExamination, setIsExamination] = useState(false); // Lägg till state för examination
  const router = useRouter();
  const selectedSchool = watch('school');
  const selectedDocumentType = watch('documentType');

  useEffect(() => {
    // Hämta alla unika skolor från Appwrite-databasen
    const fetchSchools = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!
        );

        const uniqueSchools = Array.from(new Set(response.documents.map((doc: any) => doc.university)));
        setSchools(uniqueSchools);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    // Hämta kurser för den valda skolan
    const fetchCourses = async (school: string) => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!,
          [Query.equal('university', school)]
        );

        const courseData = response.documents.map((doc: any) => ({
          id: doc.$id,
          courseCode: doc.courseCode
        }));
        setCourses(courseData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    if (selectedSchool) {
      fetchCourses(selectedSchool);
    } else {
      setCourses([]);
    }
  }, [selectedSchool]);

  useEffect(() => {
    // Uppdatera state när dokumenttypen ändras
    setIsExamination(selectedDocumentType === 'Examination');
  }, [selectedDocumentType]);

  const onSubmit: SubmitHandler<UploadFormData> = async (data) => {
    setLoading(true);
    const file = data.file[0];

    if (!file) {
      toast.error('No file selected');
      setLoading(false);
      return;
    }

    if (charCount > 100) {
      setDescriptionError('Description exceeds the maximum character limit of 100 characters.');
      setLoading(false);
      return;
    }

    try {
      // Hämta den autentiserade användarens ID
      const user = await account.get();
      const userId = user.$id;

      // Kontrollera om ett dokument med samma kurs och description redan finns
      let description = data.description;
      if (isExamination && data.examType && data.examDate) {
        description = `${data.examType} ${data.examDate}`;
      }

      const existingDocuments = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_DOCUMENTS_COLLECTION_ID!,
        [Query.equal('courses', data.courseId), Query.equal('description', description)]
      );

      if (existingDocuments.total > 0) {
        toast.error("A document with the same course and description already exists.")
        setDescriptionError('A document with the same course and description already exists.');
        setLoading(false);
        return;
      }

      // Ladda upp filen till Appwrite Storage
      const fileUploadResponse = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID!,
        'unique()', // Använd 'unique()' för att låta Appwrite generera ett unikt ID för filen
        file
      );

      // Skapa metadata för dokumentet
      const documentData = {
        documentType: data.documentType,
        courses: data.courseId, // Skicka kursens ID direkt
        uploadTime: new Date().toISOString(),
        fileUrl: `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID}/files/${fileUploadResponse.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`,
        uploadedBy: userId,
        description, // Uppdatera description här
        // Kommentera bort eller ta bort school attributet om det inte finns i din samling
        // school: data.school,
      };

      // Spara metadata i Appwrite-databasen
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_DOCUMENTS_COLLECTION_ID!, // Byt till ditt collectionId för documents
        'unique()', // Använd 'unique()' för att låta Appwrite generera ett unikt ID för dokumentet
        documentData
      );

      reset();
      toast.success('Document uploaded successfully.');
      router.push(`/`); // Redirect to success page or confirmation page
    } catch (error) {
      console.error('Error uploading document:', error);
      if (error instanceof Error) {
        console.error('Detailed error message:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const charCount = e.target.value.length;
    setCharCount(charCount);

    if (charCount > 2000) {
      setDescriptionError('Description exceeds the maximum character limit of 2000 characters.');
    } else {
      setDescriptionError('');
    }
  };

  return (
    <ProtectedRoute>
      <AdminRoute>
        <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700">School</label>
                <select
                  id="school"
                  {...register('school', { required: true })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a school</option>
                  {schools.map((school, index) => (
                    <option key={index} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">Course Code</label>
                <select
                  id="courseId"
                  {...register('courseId', { required: true })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a course</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course.id}>
                      {course.courseCode}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">Document Type</label>
                <select
                  id="documentType"
                  {...register('documentType', { required: true })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {documentTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">File</label>
                <input
                  id="file"
                  type="file"
                  {...register('file', { required: true })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {isExamination ? (
                <>
                  <div>
                    <label htmlFor="examType" className="block text-sm font-medium text-gray-700">Exam Type</label>
                    <select
                      id="examType"
                      {...register('examType', { required: isExamination })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an exam type</option>
                      {examTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="examDate" className="block text-sm font-medium text-gray-700">Exam Date</label>
                    <input
                      type="date"
                      id="examDate"
                      {...register('examDate', { required: isExamination })}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    {...register('description', { required: true })}
                    onChange={handleDescriptionChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {descriptionError && (
                    <p className="mt-2 text-sm text-red-600">{descriptionError}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-600">{charCount}/100 characters</p>
                </div>
              )}
              <Button
                type="submit"
                variant="default"
                size="default"
                className="w-full py-2 px-4 font-semibold shadow-sm"
                loading={loading}
              >
                Upload
              </Button>
            </form>
          </div>
        </div>
      </AdminRoute>
    </ProtectedRoute>
  );
};

export default UploadPage;
