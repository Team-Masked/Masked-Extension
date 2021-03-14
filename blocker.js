// const allLinks = document.querySelectorAll("a");
// // const isThumbLink = (linkElement) => {
// //     const classes = linkElement.classList
// // }
// allLinks.filter(isThumbLink);
let tobeblocked = false;

const blocker = document.createElement("div");
blocker.className = "blocker";
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.blockContent === true) {
        tobeblocked = true;
        console.log("EXTENSION IS ACTIVE");
        const videoPlayer = document.querySelector("video");
        videoPlayer.pause();

        if (request.redirectURL !== undefined) {
            blocker.onclick = () => {
                window.open(request.redirectURL, "_blank");
                tobeblocked = false;
                document.body.removeChild(blocker);
            };
        }
        document.body.appendChild(blocker);
        setInterval(() => {
            if (tobeblocked) {
                const {
                    x,
                    y,
                    width,
                    height,
                    top,
                    right,
                    bottom,
                    left,
                } = videoPlayer.getBoundingClientRect();
                // console.log(videoPlayer, "Resetting blocker...", blocker);
                blocker.style.width = `${width}px`;
                blocker.style.height = `${height}px`;
                blocker.style.top = `${top}px`;
                blocker.style.left = `${left}px`;
                videoPlayer.pause();
            }
        }, 10);
        sendResponse({ status: "blocked" });
    } else if (request.blockContent === false) {
        tobeblocked = false;
        document.body.removeChild(blocker);
        sendResponse({ status: "unblocked" });
    }
    return true;
});
