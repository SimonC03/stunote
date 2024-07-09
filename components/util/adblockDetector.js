// adblockDetector.js
export const detectAdblock = (callback) => {
    const adUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', adUrl, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        callback(false);
      } else {
        callback(true);
      }
    };
    xhr.onerror = () => {
      callback(true);
    };
    xhr.send();
  };
  