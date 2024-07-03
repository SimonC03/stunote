import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useUserContext } from '@/context/UserContext';
import { getUserData, UserProfile, Subscription, removeFavoriteCourse, addFavoriteCourse, Course, removeSubscription } from '@/lib/api';
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
      if (!user || !user.$id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await getUserData(user.$id);
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
  }, [user]);

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
  
  const renderCourses = (courses: Course[]) => {
    return courses.map(course => (
      <li key={course.$id} className="course-item">
        <Link href={`/course/${course.courseCode}`}>
          <div className="course-details">
            <span className="course-name">{course.courseName}</span><br/>
            <span className="course-code">{course.courseCode}</span><br/>
            <span className="university">{course.university}</span><br/>
          </div>
        </Link>
        <button onClick={() => toggleFavorite(course)} className="favorite-button">
          {favorites.some(fav => fav.$id === course.$id) ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-400" />}
        </button>
        <button onClick={() => handleRemoveSubscription(course.$id)} className="remove-button">
          <FaTrash className='text-gray-400'/>
        </button>
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
        <h1 className="welcome-title">Welcome back, {userData?.username}</h1>
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
                  No courses found.{' '}
                  <Link href="/explore" legacyBehavior>
                    <a className="explore-link">Go to Explore and add courses</a>
                  </Link>
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
          background-color: #6F6F6;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          transition: background 0.3s;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .course-item:hover {
          background: black;
        }
        .course-details {
          display: flex;
          flex-direction: column;
        }
        .course-name {
          font-size: 16px;
          color: #000;
          font-weight: bold;
          margin: 10px 0;
        }
        .course-code, .university {
          font-size: 12px;
        }
        .favorite-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 19px;
          color: #FFD700;
        }
        .explore-link {
          color: #47ABFE;
          text-decoration: underline;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .welcome-title {
            font-size: 20px;
            margin: 20px;
          }
          .tab {
            font-size: 14px;
          }
          .course-list {
            grid-template-columns: 1fr;
            font-size: 10px;
          }
          .course-item {
            padding: 10px;
          }
          .course-name {
            font-size: 14px;
          }
          .course-code, .university {
            font-size: 10px;
          }
          .favorite-button {
            font-size: 18px;
          }
        }
      `}</style>
    </ProtectedRoute>
  );
}

export default HomePage;
