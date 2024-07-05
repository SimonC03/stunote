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
              setIsScriptLoaded(true);
              resolve(window.AdobeDC);
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
            clientId: '43c76f66fe814110ae50dd046b84c477',
            divId: viewerRef.current.id,
          });

          adobeDCView.previewFile(
            {
              content: { location: { url: pdfUrl } },
              metaData: { fileName: 'sample.pdf' },
            },
            { embedMode: 'IN_LINE' }
          );
        }
      })
      .catch((error) => {
        console.error('Error loading AdobeDC script:', error);
      });
  }, [pdfUrl]);

  return (
    <div id="pdf-viewer-container" style={{ width: '100%', height: '100%' }}>
      <div id="adobe-dc-view" ref={viewerRef} style={{ width: '100%', height: '100%' }}></div>
      <style jsx>{`
        #pdf-viewer-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        #adobe-dc-view {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default PdfViewer;
