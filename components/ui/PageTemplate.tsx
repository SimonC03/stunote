// components/ui/PageTemplate.tsx
import React from 'react';

interface PageTemplateProps {
  title: string;
  content: string;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ title, content }) => {
  return (
    <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{title}</h1>
      <div className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PageTemplate;
