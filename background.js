//Listen for when a Tab changes state
const BLOCKED_URLS = [
    "https://www.youtube.com/watch?v=DXUAyRRkI6k",
    "https://xhamster7.desi/videos/newly-married-wife-fuck-with-relative-boy-xhQdNfa",
    "https://privatehomeclips.com/videos/7638201/drunk-sleeping-young-stepsister-katty-west-was-fucked-and-creampied-by-her-brother/",
    "https://spankbang.com/539ed/video/you+know+who",
    "https://spankbang.com/539ed/video/you+know+who",
];
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
                redirectURL: "https://www.youtube.com/watch?v=lyelxGIydeQ",
                contains: "cats, cuteness",
            });
        } else {
            console.log("Unblocking", tab.url);
            chrome.tabs.sendMessage(tabId, { blockContent: false });
        }
    }
});
