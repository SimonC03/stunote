import React, { useState } from 'react';
import Image from 'next/image';
import { Ad, getUserData } from '@/lib/api';
import { Button } from './button';
import ContactModal from './ContactModal';
import '@/components/animations/spinner.css';
import { getUser } from '@/lib/appwrite';
interface AdListProps {
  ads: Ad[];
  activeTab: string;
  onDeleteAd: (adId: string, imageId?: string) => void;
}

const AdList: React.FC<AdListProps> = ({ ads, activeTab, onDeleteAd }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleButtonClick = async (ad: Ad) => {
    setLoading(true);
    const user = getUser();

    if (activeTab === 'buy') {
      setShowContactModal(true);
    } else {
      await onDeleteAd(ad.$id!, ad.imageId);
    }
    setLoading(false);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  return (
    <div className="ads-list">
      {ads.map(ad => (
        <div key={ad.$id} className="ad-item">
          <div className="ad-image-container">
            {!imageLoaded && (
              <div className="loading-animation">
                <div className="spinner" style={{ borderRightColor: '#2268CD' }}></div>
              </div>
            )}
            <Image
              src={ad.imageUrl || 'public\icons\default-book.jpg'}
              alt={ad.bookName}
              layout="fill"
              objectFit="cover"
              quality={100}
              className={`ad-image ${imageLoaded ? 'loaded' : ''}`}
              onError={handleImageError}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="ad-details">
            <h4 className="ad-title">{ad.bookName}</h4>
            <p className="ad-price">Price: {ad.price} kr</p>
            <p className="ad-seller">Seller: Loading...</p>
            <p className="ad-condition">Condition: {ad.condition}</p>
            <p className="ad-city">Location: {ad.city}</p>
            <div className="ad-shipping">
              <p className="shipping-title">Delivery methods</p>
              <ul className="shipping-list">
                {ad.shippingMethod.map((method, index) => (
                  <li key={index}>- {method}</li>
                ))}
              </ul>
            </div>
            <div className="flex-grow"></div>
            <p className="ad-uploadDate">Uploaded: {new Date(ad.date).toLocaleDateString()}</p>
            <div className="button-container">
              <Button variant="default" size="xs" loading={loading} onClick={() => handleButtonClick(ad)}>
                {activeTab === 'buy' ? 'Contact Seller' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      <style jsx>{`
        .ads-list {
          display: grid;
          grid-template-columns: repeat(4, 1fr);  /* Ändra från flex till grid layout */
          gap: 20px;
          justify-content: center;
        }
        .ad-item {
          background: white;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 100%;
          max-width: 250px;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ad-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
        .ad-image-container {
          position: relative;
          width: 100%;
          padding-top: 100%; /* 1:1 Aspect Ratio */
          overflow: hidden;
        }
        .ad-details {
          padding: 15px;
          text-align: left;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .ad-title {
          font-size: 16px;
          font-weight: bold;
          margin: 10px 0;
          text-align: center;
          min-height: 40px; /* Ensures a consistent height */
          word-wrap: break-word; /* Break long words */
        }
        .ad-price {
          font-size: 14px;
          color: #47ABFE;
          margin: 5px 0;
          font-weight: bold;
        }
        .ad-seller, .ad-condition, .ad-city, .ad-shipping, .ad-uploadDate {
          font-size: 12px;
          color: #555;
          margin: 2px 0;
        }
        .ad-seller {
          margin-top: 10px;
        }
        .ad-details p {
          margin: 0;
        }
        .loading-animation {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 1%;
        }
        .shipping-title {
          font-weight: bold;
        }
        .shipping-list {
          margin-top: 5px;
          list-style-type: none;
          padding: 0;
        }
        .shipping-list li {
          font-size: 12px;
          margin-bottom: 2px;
        }
        .flex-grow {
          flex-grow: 1;
        }
        .button-container {
          display: flex;
          justify-content: center;
          margin-top: 10px;
          margin-bottom: 5px;
        }
        @media (max-width: 1200px) {
          .ads-list {
            grid-template-columns: repeat(3, 1fr);
          }
          .ad-item {
            width: 100%;
            max-width: 1200px;
          }
        }
        @media (max-width: 900px) {
          .ads-list {
            grid-template-columns: repeat(2, 1fr);
          }
          .ad-item {
            width: 100%;
            max-width: 900px;
          }
        }
        @media (max-width: 600px) {
          .ads-list {
            grid-template-columns: 1fr;
          }
          .ad-item {
            width: 100%;
            max-width: 600px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdList;
