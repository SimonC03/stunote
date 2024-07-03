const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'build', 'server', 'app', '_not-found');
const destDir = path.join(__dirname, '..', 'build', 'server', 'app', '(root)');

const srcFile = path.join(srcDir, 'page_client-reference-manifest.js');
const destFile = path.join(destDir, 'page_client-reference-manifest.js');

// Ensure the destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Move the file
fs.rename(srcFile, destFile, (err) => {
  if (err) throw err;
  console.log('File moved successfully');
});
