'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Course, Document, getCourseDataByCode, addFavoriteDocument, removeFavoriteDocument, getUserData } from '@/lib/api';
import PdfModal from '@/components/ui/PdfModal';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useUserContext } from '@/context/UserContext';

const CoursePage = () => {
  const { user } = useUserContext();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [documentTypes, setDocumentTypes] = useState<string[]>([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('latest');
  const [loading, setLoading] = useState(true);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [contentDescription, setContentDescription] = useState('');
  const [favorites, setFavorites] = useState<Document[]>([]);
  const [activeTab, setActiveTab] = useState<string>('allDocuments');
  const [courseName, setCourseName] = useState<string>('');
  const [courseCode, setCourseCode] = useState<string>('');
  const params = useParams();

  const courseCodeParam = params.courseId;
  const courseCodeUpper = Array.isArray(courseCodeParam) ? courseCodeParam[0]?.toUpperCase() : courseCodeParam?.toUpperCase();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData: Course = await getCourseDataByCode(courseCodeUpper);

        setCourseName(courseData.courseName);
        setCourseCode(courseData.courseCode);

        const formattedDocuments: Document[] = courseData.documents.map((doc) => ({
          $id: doc.$id,
          documentType: doc.documentType,
          uploadTime: doc.uploadTime,
          fileUrl: doc.fileUrl,
          uploadedBy: doc.uploadedBy,
          description: doc.description,
        }));

        setDocuments(formattedDocuments);
        setFilteredDocuments(formattedDocuments);

        const types = Array.from(new Set(formattedDocuments.map(doc => doc.documentType)));
        setDocumentTypes(types);

        if (user && user.$id) {
          const userData = await getUserData(user.$id);
          setFavorites(userData.favorite_documents);
        }
      } catch (error) {
        console.error('Error fetching course documents:', error);
      } finally {
        setLoading(false);
      }
    };

    if (courseCodeUpper && user && user.$id) {
      fetchCourseData();
    }
  }, [courseCodeUpper, user]);

  useEffect(() => {
    let filtered = documents;

    if (selectedDocumentType) {
      filtered = filtered.filter(doc => doc.documentType === selectedDocumentType);
    }

    if (sortOrder === 'latest') {
      filtered = filtered.sort((a, b) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime());
    } else {
      filtered = filtered.sort((a, b) => new Date(a.uploadTime).getTime() - new Date(b.uploadTime).getTime());
    }

    setFilteredDocuments(filtered);
  }, [selectedDocumentType, sortOrder, documents]);

  const toggleFavorite = async (document: Document) => {
    try {
      if (favorites.some(fav => fav.$id === document.$id)) {
        await removeFavoriteDocument(user.$id, document.$id);
        setFavorites(prevFavorites => prevFavorites.filter(fav => fav.$id !== document.$id));
      } else {
        await addFavoriteDocument(user.$id, document);
        setFavorites(prevFavorites => [...prevFavorites, document]);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const openPdfModal = (url: string, description: string) => {
    setPdfUrl(url);
    setContentDescription(description);
    setIsPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
    setPdfUrl('');
    setContentDescription('');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const renderDocuments = (documentsToRender: Document[]) => {
    return documentsToRender.map((document) => (
      <li key={document.$id} className="document-item">
        <div className="document-details" onClick={() => openPdfModal(document.fileUrl, document.documentType)}>
          <h2 className="document-type">{document.documentType}</h2>
          <p className="uploaded-description">{document.description}</p>
        </div>
        <div className="favorite-icon" onClick={() => toggleFavorite(document)}>
          {favorites.some(fav => fav.$id === document.$id) ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-400" />}
        </div>
      </li>
    ));
  };

  return (
    <div className="container">
      <h1 className="welcome-title">{courseName} - {courseCode}</h1>
      <div className="selection-container">
        <button 
          className={`tab ${activeTab === 'allDocuments' ? 'active' : ''}`} 
          onClick={() => setActiveTab('allDocuments')}
        >
          All Documents
        </button>
        <button 
          className={`tab ${activeTab === 'favorites' ? 'active' : ''}`} 
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
      </div>
      <div className='main-section'>
        <div className="filter-section">
          <div className="filter-group">
            <label htmlFor="document-type-select" className="filter-label">Document type</label>
            <select
              id="document-type-select"
              value={selectedDocumentType}
              onChange={(e) => setSelectedDocumentType(e.target.value)}
              className="filter-select"
            >
              <option value="">All types</option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="sort-order-select" className="filter-label">Sort by</label>
            <select
              id="sort-order-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="filter-select"
            >
              <option value="latest">Date - latest</option>
              <option value="oldest">Date - oldest</option>
            </select>
          </div>
        </div>
        <div className="documents-container">
          <ul className="document-list">
            {activeTab === 'allDocuments' ? renderDocuments(filteredDocuments) : renderDocuments(filteredDocuments.filter(doc => favorites.some(fav => fav.$id === doc.$id)))}
          </ul>
        </div>
      </div>
      <PdfModal
        isOpen={isPdfModalOpen}
        onRequestClose={closePdfModal}
        pdfUrl={pdfUrl}
        description={contentDescription}
      />
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
        .filter-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 48%;
        }
        .filter-label {
          margin-bottom: 5px;
          font-size: 16px;
          color: #333;
        }
        .filter-select {
          padding: 10px;
          width: 100%;
          border-radius: 4px;
          border: 1px solid #ddd;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .main-section {
          background-color: white;
        }
        .documents-container {
          display: flex;
          justify-content: center;
          padding: 10px;
        }
        .document-list {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
        }
        .document-item {
          background-color: #F6F6F6;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          transition: background 0.3s;
        }
        .document-item:hover {
          background-color: #eeeeee;
        }
        .document-details {
          cursor: pointer;
        }
        .document-type {
          font-size: 16px;
          font-weight: bold;
        }
        .uploaded-description, .upload-time {
          font-size: 12px;
          color: #777;
        }
        .favorite-icon {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .welcome-title {
            font-size: 20px;
            margin: 20px;
          }
          .document-list {
            grid-template-columns: 1fr;
          }
          .document-item {
            padding: 10px;
          }
          .document-type {
            font-size: 14px;
          }
          .uploaded-description, .upload-time {
            font-size: 10px;
          }
          .tab {
            font-size: 14px;
            padding: 8px 10px;
          }
          .filter-section {
            font-size: 12px;
          }
          .filter-group {
            width: 100%;
            margin-bottom: 10px;
          }
          .filter-label{
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default CoursePage;
