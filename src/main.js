function getTabIdsPerWindow() {
    return new Promise(resolve => {
        let result = new Map();
        chrome.tabs.query({}, tabs => {
            tabs.forEach(tab => {
                let windowId = tab.windowId;
                let tabId = tab.id;
                if (!result.has(windowId)) {
                    result.set(windowId, []);
                }
                result.get(windowId).push(tabId);
            });
            resolve(result);
        });
    });
}

function getCurrentWindow() {
    return new Promise(resolve => {
        chrome.windows.getCurrent(function (window) {
            resolve(window);
        });
    });
}

function unifyAllTabs() {
    let currentWindow = getCurrentWindow();
    let tabIdsPerWindow = getTabIdsPerWindow();
    return Promise.all([currentWindow, tabIdsPerWindow])
        .then(([currentWindow, tabIdsPerWindow]) => {
            tabIdsPerWindow.forEach((tabIds, windowId) => {
                if (windowId !== currentWindow.id) {
                    chrome.tabs.move(tabIds,
                        {windowId: currentWindow.id, index: -1});
                }
            });
        });
}

chrome.commands.onCommand.addListener(command => {
    if (command === 'unify-all-tabs') {
        unifyAllTabs();
    }
});
