'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Course, getCoursesData, getUserData, UserProfile } from '@/lib/api';
import { getCourses } from '@/lib/schools';
import Modal from '@/components/ui/Modal';
import { useUserContext } from '@/context/UserContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

const ExplorePage = () => {
  const { user, loading: userLoading } = useUserContext();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [courseCodes, setCourseCodes] = useState<string[]>([]);
  const [exploreCourses, setExploreCourses] = useState<Course[]>([]);
  const [myEducationCourses, setMyEducationCourses] = useState<Course[]>([]);
  

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const allCourses = await getCoursesData();
      setExploreCourses(allCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  

  const fetchUserData = useCallback(async () => {
    if (user && user.$id) {
      try {
        const data = await getUserData(user.$id);
        setUserData(data);
        if (data.education && data.school) {
          const codes = getCourses(data.school, data.education);
          setCourseCodes(codes);
  
          // Filtrera kurser baserat på kurskoderna
          const allCourses = await getCoursesData();
          const filteredUserCourses = allCourses.filter(course => 
            codes.includes(course.courseCode)
          );
          setMyEducationCourses(filteredUserCourses);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }, [user]);
  

  useEffect(() => {
    if (user && !userLoading) {
      fetchCourses();
      fetchUserData();
    }
  }, [user, userLoading, fetchCourses, fetchUserData]);  

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCourses(exploreCourses);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      setFilteredCourses(
        exploreCourses.filter(
          (course) =>
            (course.courseCode && course.courseCode.toLowerCase().includes(lowercasedSearchTerm)) ||
            (course.courseName && course.courseName.toLowerCase().includes(lowercasedSearchTerm))
        )
      );
    }
  }, [searchTerm, exploreCourses]);
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCloseModal = () => setSelectedCourseId(null);

  if (loading || userLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );;
  }

  const renderCourses = (coursesToRender: Course[], onSelectCourse: (courseId: string) => void) => {
    return coursesToRender.map(course => (
      <li key={course.$id} className="course-item">
        <div className="course-link" onClick={() => onSelectCourse(course.$id)}>
          <div className="course-details">
              <span className="course-name">{course.courseName}</span><br/>
              <span className="course-code">{course.courseCode}</span><br/>
              <span className="university">{course.university}</span><br/>
          </div>
        </div>
      </li>
    ));
  };
  

  
  const renderMyEducation = () => {
    if (!userData) {
      return null;
    }
  
    if (!userData.education || !userData.school) {
      return (
        <p>
          No education found.{' '}
          <Link href="/profile" legacyBehavior>
            <a className="profile-link">Go to profile and select education</a>
          </Link>
        </p>
      );
    }
  
    return (
      <>
        {courseCodes.length === 0 ? (
          <p>No Courses connected to your education yet</p>
        ) : (
          <>
            {renderCourses(myEducationCourses, setSelectedCourseId)}
          </>
        )}
      </>
    );
  };

  return (
    <ProtectedRoute>
      <div className="container">
        <h1 className="welcome-title">Discover endless learning possibilities here!</h1>
        <div className="search-bar">
          <input
            className='search-box'
            type="text"
            placeholder="Search for course name or course code"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="selection-container">
          <button 
            className={`tab ${activeTab === 'explore' ? 'active' : ''}`} 
            onClick={() => setActiveTab('explore')}
          >
            Explore
          </button>
          <button 
            className={`tab ${activeTab === 'myEducation' ? 'active' : ''}`} 
            onClick={() => setActiveTab('myEducation')}
          >
            My Education
          </button>
        </div>
        <div className="courses-container">
          {activeTab === 'explore' ? (
            <ul className="course-list">
              {renderCourses(filteredCourses, setSelectedCourseId)}
            </ul>
          ) : (
            <ul className="course-list">
              {renderMyEducation()}
            </ul>
          )}
        </div>
        {selectedCourseId && (
          <Modal
            show={Boolean(selectedCourseId)}
            onClose={handleCloseModal}
            courseId={selectedCourseId}
          />
        )}
        <style jsx>{`
          .container {
            margin-top: 20px;
            padding: 10px;
          }
          .welcome-title {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin: 30px;
            color: white;
          }
          .search-bar {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }
          .search-box {
            padding: 10px;
            border-radius: 20px;
            border: 1px solid #ddd;
            width: 600px;
            margin: 10px 10px 10px 0;
          }
          .selection-container {
            display: flex;
            justify-content: center;
            height: 40px;
            margin-bottom: 5px;
          }
          .tab {
            flex: 1;
            padding: 10px 20px;
            margin: 0;
            border: none;
            background: none;
            color: #D9D9D8;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
            background-color: #F6F6F6;
          }
          .tab.active {
            background-color: #47ABFE;
            color: white;
          }
          .courses-container {
            display: flex;
            justify-content: center;
            background-color: white;
            padding: 20px;
          }
          .course-list {
            list-style: none;
            padding: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            width: 100%;
          }
          .course-item {
            background: #F6F6F6;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            transition: background 0.3s;
            display: flex;
            flex-direction: column;
            cursor: pointer;
          }
          .course-item:hover {
            background: #eeeeee;
          }
          .course-details {
            text-decoration: none;
            color: inherit;
            display: block;
          }
          .course-code {
            font-weight: bold;
            color: #333;
            font-size: 14px;
          }
          .course-name {
            font-size: 16px;
            color: #000;
            font-weight: bold;
            margin: 10px 0;
          }
          .university {
            font-style: italic;
            color: #777;
          }
          .my-education {
            text-align: center;
          }
          .profile-link {
            color: #47ABFE;
            text-decoration: underline;
            cursor: pointer;
          }
          .my-education {
            text-align: left;
            font-size: 14px;
          }
          @media (max-width: 768px) {
            .welcome-title {
              font-size: 20px;
              margin: 20px;
            }
            .search-box {
              width: 100%;
              font-size: 10px;
            }
            .course-list {
              grid-template-columns: 1fr;
            }
            .course-item {
              padding: 10px;
            }
            .tab {
              font-size: 14px;
              padding: 8px 10px;
            }
            .search-bar {
              margin-bottom: 10px;
            }
            .course-code {
              font-size: 12px;
            }
            .course-name {
              font-size: 14px;
            }
            .university {
              font-size: 10px;
            }
            .my-education {
              font-size: 12px;
            }
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
};

export default ExplorePage;
