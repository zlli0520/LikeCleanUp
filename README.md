# LikeCleanUp Chrome Extension

This is a Chrome extension for automating the cleanup of likes on Xiaohongshu using Manifest V3.

## Features

- Automated like button clicking
- Random delay between actions to simulate human behavior
- Chrome Storage API integration
- Active Tab API usage
- Modern styling

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Development

The extension consists of the following files:
- `manifest.json`: Extension configuration
- `popup.html`: Popup interface
- `popup.js`: Popup functionality with jQuery integration
- `jquery-3.7.1.min.js`: jQuery library for DOM manipulation
- `icons/`: Extension icons

## How It Works

The extension:
1. Injects jQuery into the target webpage
2. Automatically clicks like buttons in the third tab content
3. Adds random delays between clicks to avoid detection
4. Progresses through all note items sequentially

## Permissions

The extension requires the following permissions:
- `storage`: For using Chrome's storage API
- `activeTab`: For accessing the current tab
- `scripting`: For injecting and executing scripts in web pages
- `host_permissions`: For accessing the target website

## Testing

1. Make changes to the code
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension's card
4. Test the changes by clicking the extension icon in your browser toolbar 