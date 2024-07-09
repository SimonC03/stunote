// adblockDetector.js
export const detectAdblock = (callback) => {
    const adElement = document.createElement('div');
    adElement.className = 'ad-banner';
    adElement.style.height = '1px';
    document.body.appendChild(adElement);
  
    setTimeout(() => {
      if (adElement.offsetHeight === 0) {
        callback(true);
      } else {
        callback(false);
      }
      document.body.removeChild(adElement);
    }, 100);
  };
  