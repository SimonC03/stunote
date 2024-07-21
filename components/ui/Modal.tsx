import React, { useEffect, useRef, useState } from 'react';
import { createSubscription, removeSubscription, checkUserSubscription, getCourseData, Course, Document } from '@/lib/api';
import { useUserContext } from '@/context/UserContext';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { Button } from './button';
import '@/components/animations/spinner.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  courseId: string;
}

const documentTypes = [
  "Examination",
  "Summations",
  "Lectures",
  "Notes",
  "Assignments",
  "Formula collections",
];

const countDocumentTypes = (course: Course) => {
  const counts = documentTypes.reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {} as Record<string, number>);

  course.documents.forEach((doc) => {
    if (counts[doc.documentType as keyof typeof counts] !== undefined) {
      counts[doc.documentType as keyof typeof counts]++;
    }
  });

  return counts;
};

const hasNoDocuments = (documentCounts: Record<string, number>) => {
  return Object.values(documentCounts).every(count => count === 0);
};

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  courseId,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useUserContext();
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [documentCounts, setDocumentCounts] = useState(() =>
    documentTypes.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {} as Record<string, number>)
  );
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const fetchSubscriptionAndDocuments = async () => {
      if (user && user.$id && courseId) {
        setLoading(true);
        setLoadingData(true);
        try {
          const [subscriptionResult, courseData] = await Promise.all([
            checkUserSubscription(user.$id, courseId),
            getCourseData(courseId),
          ]);
          setHasSubscription(subscriptionResult);
          setCourse(courseData);
          setDocumentCounts(countDocumentTypes(courseData));
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error('Failed to fetch data:', error.message);
          } else {
            console.error('Failed to fetch data:', error);
          }
        } finally {
          setLoading(false);
          setLoadingData(false);
        }
      } else {
        console.log('User or userId or courseId not defined');
      }
    };

    if (show) {
      fetchSubscriptionAndDocuments();
    }
  }, [show, user, courseId]);

  const handleSubscription = async () => {
    if (!user || !user.$id) {
      alert('You need to be logged in to subscribe to a course.');
      return;
    }
    setLoading(true);
    try {
      if (hasSubscription) {
        await removeSubscription(user.$id, courseId);
        toast.success('Course removed successfully!');
      } else {
        await createSubscription(user.$id, courseId);
        toast.success('Course added successfully!');
      }
      setHasSubscription(!hasSubscription);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Failed to manage subscription. Please try again.');
        console.error('Failed to manage subscription:', error.message);
      } else {
        alert('An unknown error occurred. Please try again.');
        console.error('Failed to manage subscription:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content" ref={modalRef}>
        <button className="close-button" onClick={onClose}>&times;</button>
        {loadingData ? (
          <div className="spinner" style={{ borderRightColor: '#2268CD' }}></div>
        ) : (
          <>
            <h1>{course?.courseName} - {course?.courseCode}</h1>
            <div className="course-details">
              <div className="course-info">
                <p className="university-name">School: {course?.university}</p>
                <p>This course includes:</p>
                {hasNoDocuments(documentCounts) ? (
                  <p>No documents available for this course.</p>
                ) : (
                  documentTypes.map((type) => (
                    documentCounts[type] > 0 && (
                      <p key={type}>{type} <span>{documentCounts[type]}</span></p>
                    )
                  ))
                )}
              </div>
            </div>
              <Button onClick={handleSubscription} variant="default" size="sm" loading={loading} className="subscription-button">
                {hasSubscription ? 'Remove Course' : 'Add Course'}
              </Button>
          </>
        )}
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          position: relative;
          padding: 30px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 600px;
          max-width: 90%;
          z-index: 1001;
          text-align: center;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          border: none;
          background: none;
          font-size: 24px;
          cursor: pointer;
        }

        h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .course-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .course-info {
          text-align: left;
          font-size: 16px;
          flex: 1 1 100%;
        }

        .university-name {
          font-style: italic;
        }

        .course-info p {
          margin: 8px 0;
        }

        .course-info span {
          float: right;
          font-weight: bold;
        }

        .course-icon {
          margin-top: 20px;
          flex: 0 1 100px;
        }

        .subscription-button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .modal-content {
            padding: 15px;
          }

          h1 {
            font-size: 20px;
            margin-bottom: 15px;
          }

          .course-details {
            align-items: flex-start;
          }

          .course-info {
            font-size: 14px;
          }

          .subscription-button {
            font-size: 14px;
            padding: 8px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;
