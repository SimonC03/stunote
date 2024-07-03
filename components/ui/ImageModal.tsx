// components/ui/ImageModal.tsx

import Image from 'next/image';
import React from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentUrls: string[];
  currentIndex: number;
  description: string;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  contentUrls,
  currentIndex,
  description,
  onNext,
  onPrev
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay" onClick={onRequestClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onRequestClose}>×</button>
        {contentUrls.length > 1 && (
          <>
            <button className="nav-button left" onClick={onPrev}>&lt;</button>
            <button className="nav-button right" onClick={onNext}>&gt;</button>
          </>
        )}
        <div className="content">
          <Image src={contentUrls[currentIndex]} alt={description} className="image" />
        </div>
      </div>
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          position: relative;
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 90%;
          max-height: 90%;
          overflow: auto;
          z-index: 1001;
        }
        .content {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .image {
          max-width: 100%;
          max-height: 80vh;
        }
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 2rem;
          color: white;
          cursor: pointer;
          z-index: 1002;
        }
        .nav-button.left {
          left: 10px;
        }
        .nav-button.right {
          right: 10px;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 2rem;
          color: white;
          cursor: pointer;
          z-index: 1002;
        }
      `}</style>
    </div>
  );
};

export default ImageModal;
