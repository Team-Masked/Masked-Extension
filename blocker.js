// const allLinks = document.querySelectorAll("a");
// // const isThumbLink = (linkElement) => {
// //     const classes = linkElement.classList
// // }
// allLinks.filter(isThumbLink);
let tobeblocked = false;

const blocker = document.createElement("div");
blocker.className = "blocker";
const logoContainer = document.createElement("div");
logoContainer.className = "logo-container";
const logo = document.createElement("img");
logo.className = "logo";
// logo.src = chrome.runtime.getURL("/assets/masked-logo.svg");
logo.src =
    "https://dl3.pushbulletusercontent.com/DHT4I1JS8jT3OeHbtgW94ecLyo5XvegT/masked-logo.svg";
logoContainer.appendChild(logo);
blocker.appendChild(logoContainer);
const textContainer = document.createElement("div");
textContainer.className = "text-container";
textContainer.innerText =
    "This video contains unethical content. Click to find out more.";
blocker.appendChild(textContainer);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.blockContent === true) {
        tobeblocked = true;
        console.log("MASKED EXTENSION IS ACTIVE");
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
                blocker.style.width = `${width + 5}px`;
                blocker.style.height = `${height + 5}px`;
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
