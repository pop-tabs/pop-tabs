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
     * Update tabs found from <tt>query</tt> with <tt>updateProperties</tt>.
     *
     * @memberof Main
     * @public
     *
     * @param {object} query JSON to filter tabs to update
     * @param {object} updateProperties JSON tab properties to update
     *
     * @see https://developer.chrome.com/extensions/tabs#method-query
     * @see https://developer.chrome.com/extensions/tabs#method-update
     */
    static updateTabs(query, updateProperties) {
        chrome.tabs.query(query, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.update(tab.id, updateProperties);
            });
        });
    }

    /**
     * Get all tabs found from <tt>query</tt>.
     *
     * @memberof Main
     * @public
     *
     * @param {object} query JSON to filter tabs to update
     *
     * @returns {Promise.<Array<Tab>>}
     *
     * @see https://developer.chrome.com/extensions/tabs#method-query
     * @see https://developer.chrome.com/extensions/tabs#type-Tab
     */
    static getTabs(query) {
        return new Promise(resolve => {
            chrome.tabs.query(query, resolve);
        });
    }

    /**
     * Create window with <tt>createData</tt>.
     *
     * @memberof Main
     * @public
     *
     * @param {object} createData JSON to create new window
     *
     * @returns {Promise.<Window>}
     *
     * @see https://developer.chrome.com/extensions/windows#method-create
     * @see https://developer.chrome.com/extensions/windows#type-Window
     */
    static createWindow(createData) {
        return new Promise(resolve => {
            chrome.windows.create(createData, resolve);
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
     * Merge all windows in the current window.
     *
     * @memberof Main
     * @public
     *
     * @see Main.getTabIdsPerWindow
     * @see Main.getCurrentWindow
     * @see https://developer.chrome.com/extensions/tabs#method-move
     */
    static mergeAllWindows() {
        let currentWindow = Main.getCurrentWindow();
        let tabIdsPerWindow = Main.getTabIdsPerWindow();
        Promise.all([currentWindow, tabIdsPerWindow])
            .then(([currentWindow, tabIdsPerWindow]) => {
                tabIdsPerWindow.forEach((tabIds, windowId) => {
                    if (windowId !== currentWindow.id) {
                        chrome.tabs.move(tabIds,
                            {windowId: currentWindow.id, index: -1});
                    }
                });
            });
    }

    /**
     * Isolate tabs found from <tt>query</tt> into a single new window.
     *
     * @memberof Main
     * @public
     *
     * @param query {object} JSON to filter tabs to isolate.
     *
     * @see Main.getTabs
     * @see Main.createWindow
     * @see https://developer.chrome.com/extensions/tabs#method-move
     */
    static isolateTabs(query) {
        Main.getTabs(query).then(tabs => {
            let newWindow;
            tabs.forEach((tab, index) => {
                if (index === 0) {
                    newWindow = Main.createWindow({tabId: tab.id});
                } else {
                    newWindow.then(window => {
                        chrome.tabs.move([tab.id],
                            {windowId: window.id, index: -1});
                    });
                }
            });
        });
    }

}

