document.addEventListener('DOMContentLoaded', function() {
  const actionButton = document.getElementById('actionButton');
  const resultDiv = document.getElementById('result');
  const counterDiv = document.getElementById('counter');

  // Load the counter from storage
  chrome.storage.local.get(['lastAction', 'likeCount'], function(result) {
    if (result.lastAction) {
      resultDiv.textContent = `Last operation time: ${result.lastAction}`;
    }
    if (result.likeCount) {
      counterDiv.textContent = `Likes cleaned up: ${result.likeCount}`;
    } else {
      counterDiv.textContent = 'Likes cleaned up: 0';
    }
  });

  actionButton.addEventListener('click', function() {
    const timestamp = new Date().toLocaleString();
    
    // Save the action to Chrome storage
    chrome.storage.local.set({ lastAction: timestamp }, function() {
      resultDiv.textContent = `Operation time: ${timestamp}`;
    });

    // Get the current active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // First inject jQuery
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['jquery-3.7.1.min.js']
      }, () => {
        // Then execute our click function
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: clickButtons
        });
      });
    });
  });
});

// Function that will be injected into the webpage
function clickButtons() {
  // Initialize counter for note items
  var idx = 0;
  
  // Function to click like buttons sequentially
  function run() {
    // Get the third tab content item
    const tabContent = $('.tab-content-item')[2];
    
    // Find all note items within that tab
    const noteItems = $(tabContent).find('.note-item');
    
    // Get the current note item based on index
    const currentNote = noteItems[idx];
    
    // Find and click the like button within the current note
    $(currentNote).find('.like-lottie').click();
    $($(currentNote).find('.like-lottie')).removeClass('like-lottie');
    
    // Increment index for next note
    idx += 1;
    
    // Update the counter in storage
    chrome.storage.local.get(['likeCount'], function(result) {
      const currentCount = (result.likeCount || 0) + 1;
      chrome.storage.local.set({ likeCount: currentCount }, function() {
        // Update the counter display
        const counterDiv = document.getElementById('counter');
        if (counterDiv) {
          counterDiv.textContent = `Likes cleaned up: ${currentCount}`;
        }
      });
    });
    
    // Schedule next click with random delay between 1-2 seconds
    setTimeout(run, 100 + parseInt(Math.random() * 100));
  }
  
  // Start the clicking process
  run();
} 