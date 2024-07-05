import React, { useEffect, useRef } from 'react';

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current) {
      const iframe = document.createElement('iframe');
      iframe.src = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&zoom=scale`;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';

      // Remove any existing children
      while (viewerRef.current.firstChild) {
        viewerRef.current.removeChild(viewerRef.current.firstChild);
      }

      // Add the iframe to viewerRef
      viewerRef.current.appendChild(iframe);
    }
  }, [pdfUrl]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={viewerRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
        onMouseDown={(e) => e.preventDefault()} // Prevent text selection
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default PdfViewer;
