function getLocalStorageUsagePercentage() {
    const localStorageLimit = 5242880; // 5MB in bytes
    let total = 0;
  
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const value = localStorage[key];
        // Approximate size in bytes: key length + value length (UTF-16 characters)
        total += key.length + value.length;
      }
    }
  
    // Each character is 2 bytes (UTF-16), so multiply by 2
    total *= 2;
  
    const percentageUsed = (total / localStorageLimit) * 100;
    return percentageUsed.toFixed(2); // Returns the percentage with 2 decimal places
  }
  
  function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const percentage = getLocalStorageUsagePercentage();
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${percentage}%`;
  }

  export { getLocalStorageUsagePercentage, updateProgressBar };