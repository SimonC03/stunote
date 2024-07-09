// adblockDetector.js
export const detectAdblock = (callback) => {
    const adElement = document.createElement('div');
    adElement.className = 'adsbox';
    adElement.style.height = '1px';
    adElement.style.width = '1px';
    adElement.style.position = 'absolute';
    adElement.style.top = '-1000px';
    document.body.appendChild(adElement);
  
    setTimeout(() => {
      const isAdblockActive = adElement.offsetHeight === 0 || adElement.offsetParent === null;
      document.body.removeChild(adElement);
      callback(isAdblockActive);
    }, 100);
  };
  