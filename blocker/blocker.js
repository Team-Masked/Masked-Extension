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

const tooltip = document.createElement("div");
tooltip.className = "tooltip";
const textContainer = document.createElement("div");
textContainer.className = "text-container";
textContainer.innerText =
    "This video might contain unethical content. Click to find out more.";
tooltip.appendChild(textContainer);
const tooltiptext = document.createElement("span");
tooltiptext.className = "tooltiptext";
tooltip.appendChild(tooltiptext);
blocker.appendChild(tooltip);
console.log("IN BLOCKER.JS");

const renderBlocker = (videoPlayer) => {
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
        console.log(videoPlayer.getBoundingClientRect());
    }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.blockContent === true) {
        tobeblocked = true;
        console.log("MASKED EXTENSION IS ACTIVE");
        let videoPlayer;
        videoPlayer = document.querySelector("video");
        console.log(videoPlayer);
        setInterval(() => {
            if (tobeblocked) {
                videoPlayer = document.querySelector("video");
                console.log(videoPlayer);
                videoPlayer.pause();
            }
        }, 5000);

        if (request.redirectURL !== undefined) {
            if (tobeblocked) {
                blocker.onclick = () => {
                    window.open(request.redirectURL, "_blank");
                    tobeblocked = false;
                    document.body.removeChild(blocker);
                };
            }
        }
        document.body.insertBefore(blocker, document.body.children[0]);
        renderBlocker(videoPlayer);
        window.onscroll = () => {
            renderBlocker(videoPlayer);
        };
        window.onchange = () => {
            renderBlocker(videoPlayer);
        };
        window.onresize = () => {
            renderBlocker(videoPlayer);
        };
        videoPlayer.onplay = () => {
            renderBlocker(videoPlayer);
        };
        if (request.contains !== undefined) {
            if (tobeblocked) {
                document.querySelector(
                    ".tooltiptext"
                ).innerText = `This video has been reported as it contains: ${request.contains}`;
            }
        }
    } else if (request.blockContent === false) {
        tobeblocked = false;
        document.body.removeChild(blocker);
    }
    if (request.getInfo === true) {
        console.log("getting info");
        if (document.querySelector("video")) {
            sendResponse({ videoElementPresent: true });
        } else {
            sendResponse({ videoElementPresent: false });
        }
        return true;
    }
    if (request.redirect === true) {
        window.open(request.redirectURL, "_blank");
    }
    if (request.type === "alert") {
        alert(request.message);
    }
});
