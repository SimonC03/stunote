// adblockDetector.js
export const detectAdblock = (callback) => {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    testAd.style.position = 'absolute';
    testAd.style.top = '-1000px';
    document.body.appendChild(testAd);
  
    window.setTimeout(() => {
      if (testAd.offsetHeight === 0) {
        callback(true);
      } else {
        callback(false);
      }
      document.body.removeChild(testAd);
    }, 100);
  };
  