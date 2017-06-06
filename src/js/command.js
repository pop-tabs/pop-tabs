(function () {

    'use strict';
    
    chrome.commands.onCommand.addListener(command => {
        if (command === 'merge-all-windows') {
            Main.mergeAllWindows();
        }
    });

}());
