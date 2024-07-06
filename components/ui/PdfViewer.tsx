import React, { useEffect, useRef, useState } from 'react';

interface PdfViewerProps {
  pdfUrl: string;
}

declare global {
  interface Window {
    AdobeDC: any;
  }
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const loadAdobeScript = () => {
      return new Promise((resolve, reject) => {
        if (window.AdobeDC) {
          resolve(window.AdobeDC);
        } else {
          const script = document.createElement('script');
          script.src = 'https://documentcloud.adobe.com/view-sdk/main.js';
          script.onload = () => {
            if (window.AdobeDC) {
              resolve(window.AdobeDC);
              setIsScriptLoaded(true);
            } else {
              reject(new Error('AdobeDC not loaded'));
            }
          };
          script.onerror = () => reject(new Error('Failed to load AdobeDC script'));
          document.body.appendChild(script);
        }
      });
    };

    loadAdobeScript()
      .then(() => {
        if (viewerRef.current) {
          const adobeDCView = new window.AdobeDC.View({
            clientId: '0b3fb5d0bd91457eb490dd2a03d53da1',
            divId: viewerRef.current.id,
          });

          adobeDCView.previewFile(
            {
              content: { location: { url: pdfUrl } },
              metaData: { fileName: 'document.pdf' },
            },
            {
              embedMode: 'IN_LINE',
              showAnnotationTools: false,
              showLeftHandPanel: false,
              showPageControls: false,
              showDownloadPDF: false,
              showPrintPDF: false,
              showFullScreen: false,
              showZoomControl: false,
              hasReadOnlyAccess: true,
            }
          );
        }
      })
      .catch((error) => {
        console.error('Error loading AdobeDC script:', error);
      });
  }, [pdfUrl]);

  return (
    <div>
      <div id="adobe-dc-view" ref={viewerRef} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default PdfViewer;
