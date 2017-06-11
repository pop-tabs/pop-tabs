/**
 * @author https://github.com/glegoux
 * @overview Main utilies
 */

'use strict';

class Main {

    static getTabIdsPerWindow() {
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

    static getCurrentWindow() {
        return new Promise(resolve => {
            chrome.windows.getCurrent(resolve);
        });
    }

    static mergeAllWindows() {
        let currentWindow = Main.getCurrentWindow();
        let tabIdsPerWindow = Main.getTabIdsPerWindow();
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

}
