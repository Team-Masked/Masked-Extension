// const allLinks = document.querySelectorAll("a");
// // const isThumbLink = (linkElement) => {
// //     const classes = linkElement.classList
// // }
// allLinks.filter(isThumbLink);
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.blockContent === true) {
        console.log("EXTENSION IS ACTIVE");
        const videoPlayer = document.querySelector("video");
        const blocker = document.createElement("div");
        videoPlayer.pause();
        videoPlayer.autoplay = false;
        blocker.className = "blocker";
        console.log(videoPlayer);
        videoPlayer.classList.add("tobeblocked");
        videoPlayer.parentNode?.parentNode.appendChild(blocker);

        sendResponse({ status: "blocked" });
        return true;
    }
});
