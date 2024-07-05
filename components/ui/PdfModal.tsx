import React, { useEffect, useState } from 'react';
import PdfViewer from './PdfViewer';

interface PdfModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  pdfUrl: string;
  description: string;
}

const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onRequestClose, pdfUrl, description }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const preventCopy = (e: ClipboardEvent) => e.preventDefault();
      const preventPrint = (e: BeforeUnloadEvent) => {
        alert("Printing is disabled for this content.");
        e.preventDefault();
        e.returnValue = '';
      };

      document.addEventListener('copy', preventCopy);
      window.addEventListener('beforeprint', preventPrint);

      const script = document.createElement('script');
      script.src = 'https://documentcloud.adobe.com/view-sdk/main.js';
      script.onload = () => setIsLoaded(true);
      script.onerror = () => console.error('AdobeDC script failed to load');
      document.body.appendChild(script);

      return () => {
        document.removeEventListener('copy', preventCopy);
        window.removeEventListener('beforeprint', preventPrint);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const preventDefault = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div className="overlay" onClick={onRequestClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onRequestClose}>×</button>
        <div className="content" onContextMenu={preventDefault}>
          <h2 className="description">{description}</h2>
          <div className="pdf-container" onContextMenu={preventDefault}>
            {isLoaded ? <PdfViewer pdfUrl={pdfUrl} /> : <p>Loading PDF...</p>}
          </div>
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
          width: 80%;
          height: 90%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 1001;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          animation: fadeIn 0.3s ease;
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        .description {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
          text-align: center;
        }
        .pdf-container {
          width: 100%;
          height: 100%;
          overflow: auto;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 2rem;
          color: #333;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .modal {
            width: 90%;
            height: 90%;
            padding: 10px;
          }
          .description {
            font-size: 14px;
            margin-bottom: 5px;
          }
          .close-button {
            font-size: 1.5rem;
            top: 5px;
            right: 5px;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default PdfModal;
