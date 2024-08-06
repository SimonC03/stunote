import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useUserContext } from '@/context/UserContext';
import { getUserData, UserProfile, Subscription, removeFavoriteCourse, addFavoriteCourse, Course, removeSubscription, createUserProfile, checkUserExists } from '@/lib/api';
import Link from 'next/link';
import { FaStar, FaRegStar, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import '@/components/animations/spinner.css';

const HomePage = () => {
  const { user, loading: userLoading } = useUserContext();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [favorites, setFavorites] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('yourCourses');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        let userData: UserProfile;
        const userExists = await checkUserExists(user.$id);

        if (userExists) {
          userData = await getUserData(user.$id);
        } else {
          ('User document not found, creating new profile...');
          const response = await createUserProfile(user.$id);
          userData = {
            $id: response.$id,
            userId: user.$id,
            education: '',
            school: '',
            iconUrl: '',
            iconId: '',
            documentId: response.$id,
            subscriptions: [],
            favorite_courses: [],
            favorite_documents: [],
            quizes: []
          };
        }

        setUserData(userData);
        setSubscriptions(userData.subscriptions);
        setFavorites(userData.favorite_courses);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.$id]);

  const toggleFavorite = async (course: Course) => {
    try {
      if (favorites.some(fav => fav.$id === course.$id)) {
        await removeFavoriteCourse(user.$id, course.$id);
        setFavorites(prevFavorites => prevFavorites.filter(fav => fav.$id !== course.$id));
      } else {
        await addFavoriteCourse(user.$id, course.$id);
        setFavorites(prevFavorites => [...prevFavorites, course]);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const handleRemoveSubscription = async (courseId: string) => {
    try {
      await removeSubscription(user.$id, courseId);
      setSubscriptions(prevSubscriptions => prevSubscriptions.filter(sub => sub.course.$id !== courseId));
      toast.success('Course removed successfully!');
    } catch (error) {
      console.error('Failed to remove subscription:', error);
    }
  };

  const renderCourses = (coursesToRender: Course[]) => {
    const isMobile = window.innerWidth <= 768;
  
    return coursesToRender.map(course => (
      <li key={course.$id} style={{
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: isMobile ? '4px' : '10px',
        transition: 'background 0.3s',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer'
      }}>
        <Link href={`/course/${course.courseCode}`} style={{
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
        </Link>
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          gap: '10px'
        }}>
          <button onClick={() => toggleFavorite(course)} className="favorite-button" style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: isMobile ? '10px' : '14px',
          }}>
            {favorites.some(fav => fav.$id === course.$id) ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-400" />}
          </button>
          <button onClick={() => handleRemoveSubscription(course.$id)} className="remove-button" style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: isMobile ? '10px' : '14px',
          }}>
            <FaTrash className='text-gray-400'/>
          </button>
        </div>
      </li>
    ));
  };
  

  if (userLoading || loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container">
        <h1 className="welcome-title">Welcome back, {user.name}</h1>
        <div className="selection-container">
          <button 
            className={`tab ${activeTab === 'yourCourses' ? 'active' : ''}`} 
            onClick={() => setActiveTab('yourCourses')}
          >
            Your Courses
          </button>
          <button 
            className={`tab ${activeTab === 'favorites' ? 'active' : ''}`} 
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
        </div>
        <div className="courses-container">
          {activeTab === 'yourCourses' ? (
            <ul className="course-list">
              {subscriptions.length > 0 ? (
                renderCourses(subscriptions.map(sub => sub.course))
              ) : (
                <p>
                Go to {' '}
                  <Link href="/explore" legacyBehavior>
                    <a className="explore-link">Explore</a>
                  </Link>
                  {' '}and add courses.
                </p>
              )}
            </ul>
          ) : (
            <ul className="course-list">
              {favorites.length > 0 ? (
                renderCourses(favorites)
              ) : (
                <p>No favorite courses found.</p>
              )}
            </ul>
          )}
        </div>
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
            display: flex;
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
          .explore-link {
            color: #47ABFE;
            text-decoration: underline;
            cursor: pointer;
          }
          @media (max-width: 768px) {
            .welcome-title {
              font-size: 16px;
              margin: 20px;
            }
            .selection-container {
              height: 25px;
              margin-bottom: 5px;
            }
            .tab {
              font-size: 10px;
              padding: 4px 10px;
            }
            .course-list {
              grid-template-columns: 1fr;
              font-size: 10px;
            }
            .course-item {
              padding: 10px;
            }
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
