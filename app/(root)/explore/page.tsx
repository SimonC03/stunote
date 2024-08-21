'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Course, getCoursesData, getUserData, UserProfile } from '@/lib/api';
import { getCoursesByYear } from '@/lib/schools';
import Modal from '@/components/ui/Modal';
import { useUserContext } from '@/context/UserContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

const ExplorePage = () => {
  const { user, loading: userLoading } = useUserContext();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [courseCodes, setCourseCodes] = useState<string[]>([]);
  const [exploreCourses, setExploreCourses] = useState<Course[]>([]);
  const [myEducationCourses, setMyEducationCourses] = useState<Course[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [visibleCourses, setVisibleCourses] = useState<Course[]>([]);
  const [coursesToShow, setCoursesToShow] = useState<number>(18); 

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
          const uniqueYears = new Set<number>();
          let allCodes: string[] = [];
          for (let year = 1; year <= 5; year++) {
            const codes = getCoursesByYear(data.school, data.education, year);
            if (codes.length > 0) {
              uniqueYears.add(year);
            }
            allCodes = [...allCodes, ...codes];
          }
          setCourseCodes(allCodes);
          setAvailableYears(Array.from(uniqueYears));
  
          const allCourses = await getCoursesData();
          const filteredUserCourses = allCourses.filter(course =>
            allCodes.includes(course.courseCode.trim())
          );
          setMyEducationCourses(filteredUserCourses);
          setFilteredCourses(filteredUserCourses); // Lägg till detta för att säkerställa att `filteredCourses` är korrekt initialiserad
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }, [user]);

  const handleLoadMore = () => {
    setCoursesToShow(prev => prev + 8); // Ladda in fler kurser
    setVisibleCourses(filteredCourses.slice(0, coursesToShow + 8)); // Uppdatera synliga kurser
  };
  
  useEffect(() => {
    if (user && !userLoading) {
      fetchCourses();
      fetchUserData();
    }
  }, [user, userLoading, fetchCourses, fetchUserData]);  

  useEffect(() => {
    let coursesToFilter = activeTab === 'explore' ? exploreCourses : myEducationCourses;
  
    if (selectedYear !== null && activeTab === 'myEducation' && userData?.school && userData?.education) {
      coursesToFilter = coursesToFilter.filter(course =>
        getCoursesByYear(userData.school, userData.education, selectedYear).includes(course.courseCode.trim())
      );      
    }
  
    if (searchTerm === '') {
      setFilteredCourses(coursesToFilter);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      coursesToFilter = coursesToFilter.filter(
        (course) =>
          (course.courseCode && course.courseCode.trim().toLowerCase().includes(lowercasedSearchTerm)) ||
          (course.courseName && course.courseName.toLowerCase().includes(lowercasedSearchTerm))
      );      
      setFilteredCourses(coursesToFilter);
    }
  
    // Begränsa antalet synliga kurser till coursesToShow
    setVisibleCourses(coursesToFilter.slice(0, coursesToShow));
  
  }, [searchTerm, exploreCourses, myEducationCourses, activeTab, selectedYear, userData, coursesToShow]);
  
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCloseModal = () => setSelectedCourseId(null);

  if (loading || userLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const isMobile = window.innerWidth <= 768;

  const renderCourses = (coursesToRender: Course[], onSelectCourse: (courseId: string) => void) => {
    return coursesToRender.map(course => (
      <li key={course.$id} style={{
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: isMobile ? '4px' : '10px',
        position: 'relative', // Lägg till denna rad för att möjliggöra absolut positionering
        transition: 'background 0.3s',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer'
      }}>
        {course.premium && (
          <span style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: '#DAA520',
            fontWeight: 'bold',
            fontSize: isMobile ? '8px' : '12px',
          }}>
            ★ Premium
          </span>
        )}
        <div onClick={() => onSelectCourse(course.$id)} style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'block'
        }}>
          <div style={{ marginBottom: '10px' }}>
            <p style={{
              fontSize: isMobile ? '10px' : '16px',
              color: '#000',
              fontWeight: 'bold',
              margin: '1px 0'
            }}>{course.courseName}</p>
            <p style={{
              fontWeight: 'bold',
              color: '#333',
              fontSize: isMobile ? '8px' : '14px',
              margin: '1px 0'
            }}>{course.courseCode}</p>
            <p style={{
              fontStyle: 'italic',
              color: '#777',
              fontSize: isMobile ? '8px' : '12px',
              margin: '1px 0'
            }}>{course.university}</p>
          </div>
        </div>
      </li>
    ));
  };
  
  

  const renderYearSelection = () => {
    const isMobile = window.innerWidth <= 768;
  
    return isMobile ? (
      <select
        value={selectedYear === null ? '' : selectedYear}
        onChange={(e) => setSelectedYear(e.target.value === '' ? null : parseInt(e.target.value))}
        style={{
          width: '100%',
          padding: '4px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          fontSize: '10px',
          marginBottom: '5px',
        }}
      >
        <option value="">All Years</option>
        {availableYears.map(year => (
          <option key={year} value={year}>
            {`Year ${year}`}
          </option>
        ))}
      </select>
    ) : (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '20px',
      }}>
        <button 
          className={`year-button ${selectedYear === null ? 'active' : ''}`} 
          onClick={() => setSelectedYear(null)}
          style={{
            flex: 1,
            padding: '10px 20px',
            margin: '0',
            border: 'none',
            background: selectedYear === null ? '#47ABFE' : '#F6F6F6',
            color: selectedYear === null ? 'white' : '#8c8c8c',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            cursor: 'pointer',
            borderRadius: '5px',
            transition: 'background-color 0.3s, color 0.3s',
          }}
        >
          All Years
        </button>
        {availableYears.map(year => (
          <button 
            key={year} 
            className={`year-button ${selectedYear === year ? 'active' : ''}`} 
            onClick={() => setSelectedYear(year)}
            style={{
              flex: 1,
              padding: '10px 20px',
              margin: '0',
              border: 'none',
              background: selectedYear === year ? '#47ABFE' : '#F6F6F6',
              color: selectedYear === year ? 'white' : '#8c8c8c',
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            {`Year ${year}`}
          </button>
        ))}
      </div>
    );
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
        
        {filteredCourses.length === 0 ? (
          <p>No courses found</p>
        ) : (
          <>
            {renderCourses(filteredCourses, setSelectedCourseId)}
          </>
        )}
      </>
    );
  };

  return (
    <ProtectedRoute>
      <div className="container">
        <div className="message-box">
          <p>We are currently working on uploading more courses. </p>
        </div>
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
          <>
            <ul className="course-list">
              {renderCourses(visibleCourses, setSelectedCourseId)}
            </ul>
            {visibleCourses.length < filteredCourses.length && (
              <button onClick={handleLoadMore} className="load-more-button">
                Load More
              </button>
            )}
          </>
          ) : (
            <>
              <div className='year-selection-container'>
                {renderYearSelection()}
              </div>
              
              <ul className="course-list">
                {renderMyEducation()}
              </ul>
            </>
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
          .message-box {
            padding: 10px;
            background-color: white;
            color: black;
            text-align: center;
            margin-bottom: 20px;
            border-radius: 5px;
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
          .load-more-button {
            display: block;
            margin: 5px auto;
            padding: 10px 20px;
            background-color: #47ABFE;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .load-more-button:hover {
            background-color: #005bb5;
          }
          .tab {
            flex: 1;
            padding: 10px 20px;
            margin: 0;
            border: none;
            background: none;
            color: #8c8c8c;
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
            display: block;
            justify-content: center;
            background-color: #F6F6F6;
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
          .my-education {
            text-align: center;
            text-align: left;
            font-size: 14px;
          }
          .profile-link {
            color: #47ABFE;
            text-decoration: underline;
            cursor: pointer;
          }
          
          @media (max-width: 768px) {
          .message-box {
            font-size: 10px;
            padding: 5px;
            margin-bottom: 10px;
          }
            .welcome-title {
              font-size: 16px;
              margin: 20px;
            }
            .search-box {
              width: 100%;
              font-size: 10px;
            }
            .course-list {
              grid-template-columns: 1fr;
            }
            .selection-container {
              height: 25px;
              margin-bottom: 5px;
            }
            .tab {
              font-size: 10px;
              padding: 4px 10px;
            }
            .search-bar {
              margin-bottom: 10px;
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
