/**
 * @author https://github.com/glegoux
 * @overview Manage shortcut on Google Chrome
 */

(function () {

    'use strict';

    chrome.commands.onCommand.addListener(command => {
        if (command === 'merge-all-windows') {
            Main.mergeAllWindows();
        }
    });

}());
