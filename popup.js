document.addEventListener('DOMContentLoaded', function() {
  const actionButton = document.getElementById('actionButton');
  const resultDiv = document.getElementById('result');

  // Example of using Chrome storage API
  chrome.storage.local.get(['lastAction'], function(result) {
    if (result.lastAction) {
      resultDiv.textContent = `Last action: ${result.lastAction}`;
    }
  });

  actionButton.addEventListener('click', function() {
    const timestamp = new Date().toLocaleString();
    
    // Save the action to Chrome storage
    chrome.storage.local.set({ lastAction: timestamp }, function() {
      resultDiv.textContent = `Action performed at: ${timestamp}`;
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
    
    // Increment index for next note
    idx += 1;
    console.log(idx);
    // Schedule next click with random delay between 1-2 seconds
    setTimeout(run, 1000 + parseInt(Math.random() * 1000));
  }
  
  // Start the clicking process
  run();

  // // Example: Click buttons by text content
  // const buttonsByText = Array.from(document.querySelectorAll('button')).filter(
  //   button => button.textContent.includes('Your Button Text')
  // );
  // buttonsByText.forEach(button => {
  //   button.click();
  // });

  // // Example: Click buttons by ID
  // const specificButton = document.getElementById('your-button-id');
  // if (specificButton) {
  //   specificButton.click();
  // }
} 