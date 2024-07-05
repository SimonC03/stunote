import React, { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const loadAdobeScript = () => {
      return new Promise((resolve, reject) => {
        if (window.AdobeDC) {
          return resolve(window.AdobeDC);
        } else {
          if (document.getElementById('adobe-dc-view-sdk')) {
            return resolve(window.AdobeDC);
          }
          const script = document.createElement('script');
          script.id = 'adobe-dc-view-sdk';
          script.src = 'https://documentcloud.adobe.com/view-sdk/main.js';
          script.onload = () => {
            if (window.AdobeDC) {
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
              content: {
                location: {
                  url: pdfUrl,
                },
              },
              metaData: {
                fileName: 'sample.pdf',
              },
            },
            {
              embedMode: 'IN_LINE',
            }
          );
        }
      })
      .catch((error) => {
        console.error('Error loading AdobeDC script:', error);
      });
  }, [pdfUrl]);

  return (
    <div
      id="adobe-dc-view"
      ref={viewerRef}
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
};

export default PdfViewer;
