// Add context menu items
chrome.runtime.onInstalled.addListener(() => {
    // Context menu for current window
    chrome.contextMenus.create({
        id: "doItNow",
        title: "Do It Now",
        contexts: ["selection"]
    });

    // Context menu for new window
    chrome.contextMenus.create({
        id: "doItInNewWindow",
        title: "Do It in New Window",
        contexts: ["selection"]
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    const selectedText = info.selectionText ? info.selectionText.trim() : null;

    if (info.menuItemId === "doItNow" && selectedText) {
        aggregateSearchResults(selectedText); // Open tabs in the current window
    } else if (info.menuItemId === "doItInNewWindow" && selectedText) {
        aggregateSearchResultsInNewWindow(selectedText); // Open tabs in a new window
    }
});

// Open search results in the current window
function aggregateSearchResults(query) {
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    const rottenTomatoesUrl = `https://www.rottentomatoes.com/search?search=${encodeURIComponent(query)}`;
    const netflixUrl = `https://www.netflix.com/search?q=${encodeURIComponent(query)}`;

    chrome.tabs.create({ url: googleUrl });
    chrome.tabs.create({ url: rottenTomatoesUrl });
    chrome.tabs.create({ url: netflixUrl });
}

// Open search results in a new window
function aggregateSearchResultsInNewWindow(query) {
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    const rottenTomatoesUrl = `https://www.rottentomatoes.com/search?search=${encodeURIComponent(query)}`;
    const netflixUrl = `https://www.netflix.com/search?q=${encodeURIComponent(query)}`;

    // Create a new window with the tabs
    chrome.windows.create({
        url: [googleUrl, rottenTomatoesUrl, netflixUrl],
        type: "normal"
    }, () => {
        console.log("New window created with search tabs.");
    });
}