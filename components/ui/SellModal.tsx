import React, { useEffect, useRef, useState } from 'react';
import { uploadAdImage, createAd, Ad } from '@/lib/api';
import { UserProfile, Course } from '@/lib/api';
import { useUserContext } from '@/context/UserContext';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { isEmailVerified, isPhoneVerified } from '@/lib/appwrite';

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
  const [shippingMethods, setShippingMethods] = useState<string[]>([]);
  const [courseId, setCourseId] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [file, setFile] = useState<File | null>(null);
  const [contactMethods, setContactMethods] = useState<string[]>([]);
  const [emailVerifiedState, setEmailVerifiedState] = useState(false);
  const [phoneVerifiedState, setPhoneVerifiedState] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const shippingOptions = [' Shipping', ' Meetup'];

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
    const checkVerifications = async () => {
      const emailVerified = await isEmailVerified();
      const phoneVerified = await isPhoneVerified();
      setEmailVerifiedState(emailVerified);
      setPhoneVerifiedState(phoneVerified);
    };
    
    checkVerifications();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(course =>
      course.courseName.toLowerCase().includes(courseSearch.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(courseSearch.toLowerCase())
    );
    setFilteredCourses(filtered);
  
    // Check if the courseSearch exactly matches any course name
    const exactMatch = filtered.find(course => course.courseName.toLowerCase() === courseSearch.toLowerCase());
    if (exactMatch) {
      setCourseId(exactMatch.$id);
      setSelectedCourseName(exactMatch.courseName);
    } else {
      setCourseId('');
      setSelectedCourseName('');
    }
  }, [courseSearch, courses]);
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleShippingMethodChange = (method: string) => {
    setShippingMethods(prev => 
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    );
  };

  const handleContactMethodChange = (method: string) => {
    setContactMethods(prev => 
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    );
  };
  

  const handleSubmit = async () => {
    if (!file) {
      alert('Please upload an image');
      return;
    }
  
    if (!courseId) {
      alert('Please select a valid course');
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
        shippingMethod: shippingMethods, // Skicka som array
        date: new Date().toISOString(),
        imageUrl,
        imageId,
        contactMethod: contactMethods, // Skicka som array
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
          <div className="form-group">
            <label className="input-label">Book Name</label>
            <input
              type="text"
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="input-label">Price (SEK)</label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="input-label">Condition</label>
            <select value={condition} onChange={(e) => setCondition(e.target.value)} className="input-field">
              <option value="new">Brand New</option>
              <option value="used">Gently Used</option>
              <option value="worn">Well Worn</option>
            </select>
          </div>
          <div className="form-group">
            <label className="input-label">City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="input-label">Delivery Method</label>
            <div className="checkbox-group">
              {shippingOptions.map(option => (
                <div key={option}>
                  <input
                    type="checkbox"
                    id={option.toLowerCase().replace(/\s+/g, '-')}
                    checked={shippingMethods.includes(option)}
                    onChange={() => handleShippingMethodChange(option)}
                  />
                  <label htmlFor={option.toLowerCase().replace(/\s+/g, '-')}>{option}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="input-label">Select Course</label>
            <input
              type="text"
              placeholder="Search course"
              value={courseSearch}
              onChange={(e) => {
                setCourseSearch(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="input-field"
            />
            {showDropdown && (
              <div className="dropdown">
                {filteredCourses.map(course => (
                  <div
                    key={course.$id}
                    className="dropdown-item"
                    onClick={() => {
                      setCourseId(course.$id);
                      setCourseSearch(course.courseName); // Set the input value to the selected course name
                      setShowDropdown(false); // Close the dropdown
                    }}
                  >
                    {course.courseName} ({course.courseCode})
                  </div>
                ))}
                {filteredCourses.length === 0 && (
                  <div className="dropdown-item">No courses found</div>
                )}
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="input-label">Upload Image on Book</label>
            <input type="file" onChange={handleFileChange} className="input-field" />
          </div>
          <div className="form-group">
            <label className="input-label">How do you want to be contacted?</label>
            <div className="checkbox-group">
              {emailVerifiedState && (
                <div>
                  <input
                    type="checkbox"
                    id="email"
                    checked={contactMethods.includes('email')}
                    onChange={() => handleContactMethodChange('email')}
                  />
                  <label htmlFor="email"> Email</label>
                </div>
              )}
              {phoneVerifiedState && (
                <div>
                  <input
                    type="checkbox"
                    id="phone"
                    checked={contactMethods.includes('phone')}
                    onChange={() => handleContactMethodChange('phone')}
                  />
                  <label htmlFor="phone"> Phone</label>
                </div>
              )}
            </div>
          </div>
          <Button type="button" size="sm" onClick={handleSubmit} className="submit-button">Submit</Button>
          <p className="disclaimer-text">By uploading your ad, you agree that your email or phone number may be visible to other users.</p>
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
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 400px;
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
          margin-bottom: 15px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: left;
        }

        .form-group {
          margin-bottom: 5px;
        }

        .input-label {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 2px;
          display: block;
          color: #333;
        }

        .input-field {
          width: 100%;
          padding: 6px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .shipping-methods, .contact-methods {
          text-align: left;
        }

        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .submit-button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .submit-button:hover {
          background-color: #0056b3;
        }

        .disclaimer-text {
          font-size: 12px;
          color: #888;
        }

        .dropdown {
          position: absolute;
          width: calc(100% - 40px);
          max-height: 150px;
          overflow-y: auto;
          border: 1px solid #ddd;
          border-radius: 5px;
          background: white;
          z-index: 1002;
          margin-top: -1px;
        }

        .dropdown-item {
          padding: 8px;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default SellModal;
