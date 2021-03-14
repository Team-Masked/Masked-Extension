// const allLinks = document.querySelectorAll("a");
// // const isThumbLink = (linkElement) => {
// //     const classes = linkElement.classList
// // }
// allLinks.filter(isThumbLink);
const BLOCKED_URLS = ["https://www.youtube.com/watch?v=aFMLMQaUrRw"];
const isBlockedURL = (url) => {
    for (blockedURL of BLOCKED_URLS) {
        if (url === blockedURL) return true;
    }
    return false;
};
console.log("EXTENSION IS ACTIVE");
const videoPlayer = document.querySelector("video");
console.log(videoPlayer);
