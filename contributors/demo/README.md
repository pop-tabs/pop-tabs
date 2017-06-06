# How to build a demo ?

Follow these steps :

1) Change your name by `Guest` and hide your bookmarks bar to remain anonymous.

2) Run a web server with python 2 in `demo/` folder, if your browser refuses to open local files :

~~~
python -m SimpleHTTPServer 8000
~~~

3) Enable `Experimental Extension APIs` at chrome://flags/.

4) Load your experimental chrome extension at chrome://extensions/ :  
 \- allow `Developer mode`,  
 \- click on `Load unpacked extension…` button,  
 \- enable this chrome extension. 
 
5) Open html files in `demo/` folder that is the root of your local web server at http://localhost:8000.

### Remarks

You can check `Allow in incognito` checkbox button if this chrome extension is already present on your current session google chrome.
Then use incognito window.  

You can use `Guest` mode.

### References

> https://developer.chrome.com/extensions/getstarted#unpacked
