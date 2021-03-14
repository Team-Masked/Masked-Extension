//Listen for when a Tab changes state
const BLOCKED_URLS = ["https://www.youtube.com/watch?v=DXUAyRRkI6k"];
const isBlockedURL = (url) => {
    for (blockedURL of BLOCKED_URLS) {
        console.log(blockedURL, url);
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
            chrome.tabs.sendMessage(tabId, {
                blockContent: true,
                redirectURL: `https://masked.io/report?url=${clickData.pageUrl}`,
                contains: "cats, cuteness",
            });
        } else {
            console.log("Unblocking", tab.url);
            chrome.tabs.sendMessage(tabId, { blockContent: false });
        }
    }
});

// Context Menu
let contextMenuItem = {
    id: "reportRedirect",
    title: "Report Video in Page",
    contexts: ["all"],
};
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener((clickData) => {
    console.log(clickData);
    if (clickData.menuItemId === "reportRedirect") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    getInfo: true,
                },
                (response) => {
                    if (response.videoElementPresent) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            redirect: true,
                            redirectURL: `https://masked.io/report?url=${clickData.pageUrl}`,
                        });
                    } else {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            type: "alert",
                            message:
                                "Could not find any video element in the page.",
                        });
                    }
                }
            );
        });
    }
});
