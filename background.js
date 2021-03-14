//Listen for when a Tab changes state
const BLOCKED_URLS = ["https://www.youtube.com/watch?v=aFMLMQaUrRw"];
const isBlockedURL = (url) => {
    for (blockedURL of BLOCKED_URLS) {
        if (url === blockedURL) return true;
    }
    return false;
};
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo && changeInfo.status == "complete") {
        console.log("Tab updated: ", tabId, changeInfo, tab);

        // chrome.tabs.sendMessage(tabId, {data: tab}, function(response) {
        //     console.log(response);
        // });
        if (isBlockedURL(tab.url)) {
            console.log("Blocking", tab.url);
            chrome.tabs.sendMessage(
                tabId,
                { blockContent: true, redirectURL: "google.com" },
                (response) => {
                    console.log(response?.status);
                }
            );
        } else {
            console.log("Unblocking", tab.url);
            chrome.tabs.sendMessage(
                tabId,
                { blockContent: false },
                (response) => {
                    console.log(response?.status);
                }
            );
        }
    }
});
