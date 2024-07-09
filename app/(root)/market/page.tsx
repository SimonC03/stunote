'use client'

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import SellModal from '@/components/ui/SellModal';
import '@/components/animations/spinner.css';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/UserContext';
import { getCoursesData, getUserAds, getAds, Course, Ad, deleteAd } from '@/lib/api';
import AdList from '@/components/ui/AdList';

const MarketPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [allAds, setAllAds] = useState<Ad[]>([]);
  const { user } = useUserContext();

  useEffect(() => {
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
    try {
      await deleteAd(adId, imageId);
      setAllAds(prevAds => prevAds.filter(ad => ad.$id !== adId));
    } catch (error) {
      console.error('Failed to delete ad:', error);
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
        <h1 className="welcome-title">Marketplace to Buy and Sell Used Textbooks</h1>
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
            <AdList ads={sortedAds} activeTab={activeTab} onDeleteAd={handleDeleteAd} />
          </div>
        ) : (
          <div className="sell-container">
            
            <SellModal show={isModalOpen} onClose={closeModal} user={user} courses={courses} />
            <div className="your-ads">
              <h3>Your Ads</h3>
              <AdList ads={userAds} activeTab={activeTab} onDeleteAd={handleDeleteAd}/>
            </div>
            <Button type="button" size="sm" onClick={openModal}>Create Ad</Button>
          </div>
        )}
      </div>
        <style jsx>{`
          .container {
            margin-top: 20px;
            padding: 10px;
            max-width: 1600px;  /* Ändra från 1200px till 1600px */
            margin-left: auto;
            margin-right: auto;
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
          .your-ads {
            margin-bottom: 20px;
            width: 100%;
            text-align: left;
          }
          .your-ads h3 {
            margin-bottom: 10px;
            text-align: center;
            font-size: 20px;
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
            .buy-container, .sell-container {
              font-size: 10px;
            }
            .filters {
              gap: 5px;
            }
            .filters input,
            .filters select {
              font-size: 12px;
              padding: 5px;
            }
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
};

export default MarketPage;
