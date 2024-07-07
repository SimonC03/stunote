import React from 'react';
import Image from 'next/image';
import { Ad } from '@/lib/api';
import { Button } from './button';

interface AdListProps {
  ads: Ad[];
}

const AdList: React.FC<AdListProps> = ({ ads }) => {
  return (
    <div className="ads-list">
      {ads.map(ad => (
        <div key={ad.$id} className="ad-item">
          <div className="ad-image-container">
            <Image
              src={ad.imageUrl || '/default-image.jpg'}
              alt={ad.bookName}
              layout="fill"
              objectFit="cover"
              quality={100}
              className="ad-image"
            />
          </div>
          <div className="ad-details">
            <h4 className="ad-title">{ad.bookName}</h4>
            <p className="ad-price">Price: {ad.price} kr</p>
            <p className="ad-seller">Seller: {ad.user.username}</p>
            <p className="ad-condition">Condition: {ad.condition}</p>
            <p className="ad-city">Location: {ad.city}</p>
            <p className="ad-shipping">Shipping Method: {ad.shippingMethod}</p>
            <p className="ad-uploadDate">Uploaded: {new Date(ad.date).toLocaleDateString()}</p>
            <div className="button-container">
              <Button variant="default" size="xs">Contact Seller</Button>
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        .ads-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        .ad-item {
          background: white;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 200px;
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
        .ad-image {
          object-fit: cover;
        }
        .ad-details {
          padding: 15px;
          text-align: left;
          width: 100%;
          box-sizing: border-box;
        }
        .ad-title {
          font-size: 16px;
          font-weight: bold;
          margin: 10px 0;
          text-align: center;
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
        .button-container {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default AdList;
