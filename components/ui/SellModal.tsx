import React, { useEffect, useRef, useState } from 'react';
import { uploadAdImage, createAd, Ad } from '@/lib/api';
import { UserProfile, Course } from '@/lib/api';
import { useUserContext } from '@/context/UserContext';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';

interface SellModalProps {
  show: boolean;
  onClose: () => void;
  user: UserProfile;
  courses: Course[];
}

const SellModal: React.FC<SellModalProps> = ({ show, onClose, user, courses }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [bookName, setBookName] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('new');
  const [city, setCity] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [courseId, setCourseId] = useState('');
  const [file, setFile] = useState<File | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please upload an image');
      return;
    }

    if (!user || !user.$id) {
      alert('You need to be logged in to create an ad.');
      return;
    }

    try {
      const imageUploadResponse = await uploadAdImage(file);
      const { imageUrl, imageId } = imageUploadResponse;

      const newAd: Omit<Ad, '$id'> = {
        bookName,
        user,
        courses: courses.find(course => course.$id === courseId) as Course,
        price: Number(price),
        condition,
        city,
        shippingMethod,
        date: new Date().toISOString(),
        imageUrl,
        imageId
      };      

      const response = await createAd(newAd);

      toast.success('Ad created successfully');
      onClose();
    } catch (error) {
      console.error('Failed to create ad', error);
      toast.error('Failed to create ad');
    }
  };


  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content" ref={modalRef}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Sell Textbook</h2>
        <form>
          <input
            type="text"
            placeholder="Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <select value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option value="new">Brand New</option>
            <option value="used">Gently Used</option>
            <option value="new">Well Worn</option>
          </select>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Shipping Method"
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
          />
          <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.$id} value={course.$id}>{course.courseName}</option>
            ))}
          </select>
          <input type="file" onChange={handleFileChange} />
          <Button type="button" size="sm" onClick={handleSubmit}>Submit</Button>
        </form>
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

        h2 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        input, select {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default SellModal;
