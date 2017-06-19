/**
 * @author https://github.com/glegoux
 * @overview Manage context menu on Google Chrome
 */

(function () {

    'use strict';

    chrome.contextMenus.removeAll();

    chrome.contextMenus.create({
        id: "manage-tabs-item",
        title: "Manage tabs",
        contexts: ["page_action"],
    });

    chrome.contextMenus.create({
        parentId: "manage-tabs-item",
        id: "merge-all-windows-item",
        title: "Merge all windows       Ctrl+Shift+U",
        contexts: ["page_action"],
        onclick: () => {
            Main.mergeAllWindows();
        }
    });

    chrome.contextMenus.create({
        parentId: "manage-tabs-item",
        id: "pin-all-tabs-item",
        title: "Pin all tabs",
        contexts: ["page_action"],
        onclick: () => {
            Main.updateTabs({}, {pinned: true});
        }
    });

    chrome.contextMenus.create({
        parentId: "manage-tabs-item",
        id: "unpin-all-tabs-item",
        title: "Unpin all tabs",
        contexts: ["page_action"],
        onclick: () => {
            Main.updateTabs({}, {pinned: false});
        }
    });

    chrome.contextMenus.create({
        parentId: "manage-tabs-item",
        id: "isolate-audible-tabs-item",
        title: "Isolate audible tabs",
        contexts: ["page_action"],
        onclick: () => {
            Main.isolateTabs({audible: true});
        }
    });

    chrome.contextMenus.create({
        parentId: "manage-tabs-item",
        id: "mute-all-tabs-item",
        title: "Mute all tabs",
        contexts: ["page_action"],
        onclick: () => {
            Main.updateTabs({}, {muted: true});
        }
    });

    chrome.contextMenus.create({
        parentId: "manage-tabs-item",
        id: "unmute-all-tabs-item",
        title: "Unmute all tabs",
        contexts: ["page_action"],
        onclick: () => {
            Main.updateTabs({}, {muted: false});
        }
    });

    chrome.contextMenus.create({
        id: "save-session-and-quit-item",
        title: "Save session and quit",
        contexts: ["page_action"],
        onclick: () => {
            Main.mergeAllWindows();
            Main.updateTabs({}, {pinned: true});
            Main.getCurrentWindow().then(window => {
                chrome.windows.remove(window.id);
            });
        }
    });

}());
