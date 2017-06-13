/**
 * @author https://github.com/glegoux
 * @overview Main utilities
 */

'use strict';

/**
 * Utility Class managing tabs.
 *
 * @class
 */
class Main {

    /**
     * Get all tab identifiers for each window under shape
     * a <tt>Map[int, array[int]]</tt> object.
     *
     * @memberof Main
     * @public
     *
     * @returns {Promise.<Map>}
     *
     * @see https://developer.chrome.com/extensions/tabs#method-query
     */
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

    /**
     * Get the current window under shape <tt>Window</tt> object.
     *
     * @memberof Main
     * @public
     *
     * @returns {Promise.<Window>}
     *
     * @see https://developer.chrome.com/extensions/windows#method-getCurrent
     * @see https://developer.chrome.com/extensions/windows#type-Window
     */
    static getCurrentWindow() {
        return new Promise(resolve => {
            chrome.windows.getCurrent(resolve);
        });
    }

    /**
     * Merge all windows in the current window.
     *
     * @memberof Main
     * @public
     *
     * @returns {Promise.<undefined>}
     *
     * @see Main.getTabIdsPerWindow
     * @see Main.getCurrentWindow
     */
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
