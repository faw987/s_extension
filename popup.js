document.addEventListener("DOMContentLoaded", () => {
    const searchText = document.getElementById("searchText");
    const searchButton = document.getElementById("searchButton");
    const searchNewWindowButton = document.getElementById("searchNewWindowButton");

    // Click the search button when Enter is pressed
    searchText.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            searchButton.click();
        }
    });

    // Handle "Search in Current Window" button click
    searchButton.addEventListener("click", () => {
        const query = searchText.value.trim();
        if (query) {
            chrome.runtime.sendMessage({ action: "aggregateSearch", query });
            window.close(); // Close the popup after triggering the search
        } else {
            alert("Please enter text to search.");
        }
    });

    // Handle "Search in New Window" button click
    searchNewWindowButton.addEventListener("click", () => {
        const query = searchText.value.trim();
        if (query) {
            chrome.runtime.sendMessage({ action: "aggregateSearchNewWindow", query });
            window.close(); // Close the popup after triggering the search
        } else {
            alert("Please enter text to search.");
        }
    });
});