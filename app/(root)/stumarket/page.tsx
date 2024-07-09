'use client'

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import SellModal from '@/components/ui/SellModal';
import '@/components/animations/spinner.css';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/UserContext';
import { getCoursesData, getUserAds, getAds, Course, Ad, deleteAd } from '@/lib/api';
import AdList from '@/components/ui/AdList';
import toast from 'react-hot-toast';
import { detectAdblock } from '@/components/util/adblockDetector';

const MarketPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [allAds, setAllAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext();
  const [adblockDetected, setAdblockDetected] = useState(false);

  useEffect(() => {
    detectAdblock((detected: boolean) => {
      setAdblockDetected(detected);
    });
  
    const fetchCourses = async () => {
      const coursesData: Course[] = await getCoursesData();
      setCourses(coursesData);
    };
  
    fetchCourses();
  }, []);  

  useEffect(() => {
    const fetchAds = async () => {
      if (user && user.$id) {
        const userAds: Ad[] = await getUserAds(user.$id);
        setAds(userAds);
      }
      const allAdsData: Ad[] = await getAds();
      setAllAds(allAdsData);
    };
    fetchAds();
  }, [user]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [filters, setFilters] = useState({
    searchText: '',
    school: '',
    city: '',
    condition: '',
    sortBy: '',
  });

  const [filterOptions, setFilterOptions] = useState({
    schools: [] as string[],
    cities: [] as string[],
    conditions: [] as string[],
  });

  useEffect(() => {
    if (user) {
      const filteredAds = allAds.filter(ad => ad.user.userId !== user.$id);
      const schools = Array.from(new Set(filteredAds.map(ad => ad.courses.university)));
      const cities = Array.from(new Set(filteredAds.map(ad => ad.city)));
      const conditions = Array.from(new Set(filteredAds.map(ad => ad.condition)));
      setFilterOptions({
        schools,
        cities,
        conditions,
      });
    }
  }, [allAds, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredAds = allAds.filter(ad => {
    const matchesSearchText =
      ad.bookName.toLowerCase().includes(filters.searchText.toLowerCase()) ||
      ad.courses.courseCode.toLowerCase().includes(filters.searchText.toLowerCase()) ||
      ad.courses.courseName.toLowerCase().includes(filters.searchText.toLowerCase());
    const matchesSchool = !filters.school || ad.courses.university === filters.school;
    const matchesCity = !filters.city || ad.city === filters.city;
    const matchesCondition = !filters.condition || ad.condition === filters.condition;
    const isNotUserAd = user && ad.user.userId !== user.$id;

    return matchesSearchText && matchesSchool && matchesCity && matchesCondition && isNotUserAd;
  });

  const handleDeleteAd = async (adId: string, imageId?: string) => {
    setLoading(true); // Set loading state to true
    try {
      await deleteAd(adId, imageId);
      setAllAds(prevAds => prevAds.filter(ad => ad.$id !== adId));
      toast.success("Ad was successfully deleted");
    } catch (error) {
      console.error('Failed to delete ad:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedAds = filteredAds.sort((a, b) => {
    if (filters.sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (filters.sortBy === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (filters.sortBy === 'priceLowHigh') {
      return a.price - b.price;
    } else if (filters.sortBy === 'priceHighLow') {
      return b.price - a.price;
    }
    return 0;
  });

  const userAds = user ? allAds.filter(ad => ad.user.userId === user.$id) : [];
  return (
    <ProtectedRoute>
      <div className="container">
        {adblockDetected && (
          <div className="adblock-warning">
            <p>Please disable your adblocker to see all content on this page.</p>
          </div>
        )}
        <h1 className="main-title">Buy and Sell Your Textbooks Easily</h1>
        <p className="welcome-message">Welcome to StuMarket - Save money and find the textbooks you need, or sell your used books to help others.</p>
        <div className="selection-container">
          <button
            className={`tab ${activeTab === 'buy' ? 'active' : ''}`}
            onClick={() => setActiveTab('buy')}
          >
            Buy
          </button>
          <button
            className={`tab ${activeTab === 'sell' ? 'active' : ''}`}
            onClick={() => setActiveTab('sell')}
          >
            Sell
          </button>
        </div>
        <div className="content-container">
          {activeTab === 'buy' ? (
            <div className="buy-container">
              <div className="filters">
                <input
                  type="text"
                  name="searchText"
                  value={filters.searchText}
                  onChange={handleInputChange}
                  placeholder="Search by book name, course code, or course name"
                />
                <select
                  name="school"
                  value={filters.school}
                  onChange={handleInputChange}
                >
                  <option value="">School</option>
                  {filterOptions.schools.map(school => (
                    <option key={school} value={school}>{school}</option>
                  ))}
                </select>
                <select
                  name="city"
                  value={filters.city}
                  onChange={handleInputChange}
                >
                  <option value="">City</option>
                  {filterOptions.cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <select
                  name="condition"
                  value={filters.condition}
                  onChange={handleInputChange}
                >
                  <option value="">Condition</option>
                  {filterOptions.conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleInputChange}
                >
                  <option value="">Sort By</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                </select>
              </div>
              {sortedAds.length === 0 ? (
                <p className="no-ads-message">No ads available at the moment.</p>
              ) : (
                <AdList ads={sortedAds} activeTab={activeTab} onDeleteAd={handleDeleteAd} />
              )}
            </div>
          ) : (
            <div className="sell-container">
              <SellModal show={isModalOpen} onClose={closeModal} user={user} courses={courses} />
              <div className="your-ads">
                <p className="section-title">Your Ads</p>
                {userAds.length === 0 ? (
                  <p className="no-ads-message">You have not uploaded any ads yet.</p>
                ) : (
                  <AdList ads={userAds} activeTab={activeTab} onDeleteAd={handleDeleteAd} />
                )}
              </div>
              <Button type="button" size="xs" onClick={openModal} loading={loading}>Create Ad</Button>
            </div>
          )}
        </div>
        <style jsx>{`
          .container {
            margin-top: 20px;
            padding: 10px;
            max-width: 1600px;
            margin-left: auto;
            margin-right: auto;
          }
          .adblock-warning {
            padding: 10px;
            background-color: #ffcccc;
            color: #cc0000;
            text-align: center;
            margin-bottom: 20px;
            border: 1px solid #cc0000;
            border-radius: 5px;
          }
          .main-title {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin: 30px;
            color: white;
          }
          .welcome-message {
            font-size: 16px;
            text-align: center;
            margin-bottom: 20px;
            color: white;
          }
          .section-title {
            font-size: 18px;
            text-align: center;
            margin-bottom: 5px;
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
          .content-container {
            display: flex;
            justify-content: center;
            background-color: #F6F6F6;
            padding: 20px;
            flex-wrap: wrap;
          }
          .buy-container, .sell-container {
            width: 100%;
            text-align: center;
          }
          .filters {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
          }
          .filters input,
          .filters select {
            padding: 8px;
            font-size: 14px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .no-ads-message {
            font-size: 16px;
            color: #555;
            text-align: center;
            margin: 20px 0;
          }
          .your-ads {
            margin-bottom: 20px;
            width: 100%;
            text-align: left;
          }
          @media (max-width: 768px) {
            .main-title {
              font-size: 20px;
              margin: 20px;
            }
            .welcome-message {
              font-size: 14px;
              margin-bottom: 15px;
            }
            .section-title {
              font-size: 16px;
              margin-bottom: 5px;
            }
            .selection-container {
              height: 35px;
              margin-bottom: 5px;
            }
            .tab {
              font-size: 14px;
              padding: 8px 16px;
            }
            .buy-container, .sell-container {
              font-size: 14px;
            }
            .filters {
              gap: 8px;
            }
            .filters input,
            .filters select {
              font-size: 12px;
              padding: 6px;
            }
            .no-ads-message {
              font-size: 14px;
            }
          }
          @media (max-width: 480px) {
            .main-title {
              font-size: 16px;
              margin: 15px;
            }
            .welcome-message {
              font-size: 10px;
              margin-bottom: 10px;
            }
            .section-title {
              font-size: 14px;
              margin-bottom: 5px;
            }
            .selection-container {
              height: 30px;
              margin-bottom: 5px;
            }
            .tab {
              font-size: 12px;
              padding: 6px 12px;
            }
            .buy-container, .sell-container {
              font-size: 12px;
            }
            .filters {
              gap: 5px;
            }
            .filters input,
            .filters select {
              font-size: 10px;
              padding: 5px;
            }
            .no-ads-message {
              font-size: 12px;
            }
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
};

export default MarketPage;
