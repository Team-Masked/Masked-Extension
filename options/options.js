const saveBtn = document.querySelector(".save-btn");
const whitelisted = document.querySelector(".whitelist-sites-input");
saveBtn.addEventListener("click", () => {
    const sites = whitelisted.value.split("\n");
    chrome.storage.sync.set({ sites });
});
chrome.storage.sync.get("sites", (response) => {
    whitelisted.defaultValue = response.sites.join("\n");
});
