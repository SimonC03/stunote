import React, { useEffect, useRef } from 'react';
import { Button } from './button';

interface ContactModalProps {
  show: boolean;
  onClose: () => void;
  contactInfo: {
    email: string;
    phoneNumber?: string;
    contactMethods: string[];
  };
}

const ContactModal: React.FC<ContactModalProps> = ({ show, onClose, contactInfo }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content" ref={modalRef}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Contact Information</h2>
        {contactInfo.contactMethods.includes('email') && (
          <p>
            <strong>Email:</strong> {contactInfo.email}
          </p>
        )}
        {contactInfo.contactMethods.includes('phone') && contactInfo.phoneNumber && (
          <p>
            <strong>Phone:</strong> {contactInfo.phoneNumber}
          </p>
        )}
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
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
          width: 90%;
          max-width: 400px;
          text-align: center;
          z-index: 1001;
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
        p {
          font-size: 16px;
          margin-bottom: 10px;
        }
        @media (max-width: 600px) {
          .modal-content {
            padding: 15px;
          }
          h2 {
            font-size: 20px;
          }
          p {
            font-size: 14px;
          }
          .close-button {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactModal;
