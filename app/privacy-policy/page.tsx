import fs from 'fs/promises';
import path from 'path';
import React from 'react';

const PrivacyPolicy = async () => {
  const filePath = path.join(process.cwd(), 'app', 'privacy-policy', 'policytext.txt');
  const content = await fs.readFile(filePath, 'utf8');

  // Delar upp texten i sektioner baserat på dubbla radbrytningar för att bevara formateringen
  const sections = content.split('\n\n').map((section, index) => {
    return (
      <div key={index} style={{ marginBottom: '20px' }}>
        {section.split('\n').map((line, i) => (
          <p key={i} style={{ marginBottom: '10px', textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
            {line}
          </p>
        ))}
      </div>
    );
  });

  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto',
      padding: '40px',
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      fontFamily: '"Times New Roman", Times, serif',
      lineHeight: 1.6
    }}>
      <h1 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '40px', fontWeight: 'bold' }}>
        Privacy Policy
      </h1>
      {sections}
    </div>
  );
};

export default PrivacyPolicy;
