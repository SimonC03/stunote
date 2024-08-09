import fs from 'fs/promises';
import path from 'path';
import React from 'react';

const PrivacyPolicy = async () => {
  const filePath = path.join(process.cwd(), 'app', 'privacy-policy', 'policytext.txt');
  const content = await fs.readFile(filePath, 'utf8');

  // Delar upp texten i sektioner baserat på radbrytningar för att förbättra formateringen
  const sections = content.split('\n\n').map((section, index) => {
    const lines = section.split('\n');
    const title = lines[0];

    if (title.trim()) {
      const text = lines.slice(1).join('<br />');
      return (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', fontWeight: 'bold' }}>
            {title}
          </h2>
          <p style={{ marginBottom: '20px', textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      );
    } else {
      const text = lines.join('<br />');
      return (
        <p key={index} style={{ marginBottom: '20px', textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: text }} />
      );
    }
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
