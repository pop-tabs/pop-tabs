function getTabIdsPerWindow() {
    return new Promise(function (resolve, reject) {
        var result = new Map();
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                var windowId = tab.windowId;
                var tabId = tab.id;
                if (!result.has(windowId)) {
                    result.set(windowId, []);
                }
                result.get(windowId).push(tabId);
            });
            resolve(result);
        });
    });
}

function unifyAllTabs() {
    return getTabIdsPerWindow().then(
        function (tabIdsPerWindow) {
            chrome.windows.getCurrent(function (window) {
                tabIdsPerWindow.forEach(function (tabIds, windowId) {
                    if (windowId !== window.id) {
                        chrome.tabs.move(tabIds, {windowId: window.id, index: -1});
                    }
                });
            });
        }
    )
}

chrome.commands.onCommand.addListener(function (command) {
    if (command === 'unify-all-tabs') {
        unifyAllTabs();
    }
});
