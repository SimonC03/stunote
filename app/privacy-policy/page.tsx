// app/privacy-policy/page.tsx
import fs from 'fs/promises';
import path from 'path';
import React from 'react';
import PageTemplate from '@/components/ui/PageTemplate';

const PrivacyPolicy = async () => {
  const filePath = path.join(process.cwd(), 'app', 'privacy-policy', 'policytext.txt');
  const content = await fs.readFile(filePath, 'utf8');

  // Delar upp texten i sektioner baserat på radbrytningar för att förbättra formateringen
  const sections = content.split('\n\n').map((section, index) => {
    const lines = section.split('\n');
    const title = lines[0];
    const text = lines.slice(1).join('<br />');
    return `<h2 class="text-xl font-semibold mb-2">${title}</h2><p class="mb-4">${text}</p>`;
  }).join('');

  return <PageTemplate title="Privacy Policy" content={sections} />;
};

export default PrivacyPolicy;
