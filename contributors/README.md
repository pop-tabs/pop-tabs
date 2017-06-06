# Reserved for contributors

This page describes how to complete, to debug or to improve this chrome extension.  

~~~
EXTENSION_ID: obdkadanihffijoldabdhhdhmdbkdejg
~~~

**How to find documentation about chrome extension ?**

Before contributing, I advice you to read several tutorials on how to work google chrome:  

\- https://support.google.com/chrome/?hl=en  
\- https://developer.chrome.com/extensions  
\- https://developers.google.com/web/tools/chrome-devtools/ 

There are a lot examples (above all with chromium project). 
 
**How to run chrome extension locally in dev mode ?**  

1) Enable `Experimental Extension APIs` at chrome://flags/#extension-apis .

2) Load your experimental chrome extension at chrome://extensions/ :  
      \- Allow `Developer mode`.  
      \- Click on `Load unpacked extension…` button.  
      \- Enable this chrome extension.  

**How to view source code of a chrome extension ?**  

Suppose that your work environment is Ubuntu.  

The local data stored by google chrome application are in `$HOME/.config/google-chrome/<profile-name>` specified by then **Profile Path**, see that at chrome://version. To see the code source of any chrome extension you can either install `Chrome Extension Source Code Viewer` or see the content of `Default/Extension/<chrome-extension-id>` folder. 

**How to see all versions of google chrome and market shares ?**

\- https://chromereleases.googleblog.com/  
\- http://gs.statcounter.com/browser-market-share/  
\- https://en.wikipedia.org/wiki/Google_Chrome_version_history  

**How to code javascript,css,html ... ?**

See https://developer.mozilla.org/en/ and use this validator https://validator.w3.org/.

**How to do a demo ?**

Go to `demo/` folder.

**How to publish on Chrome Web store ?**

Go to dashboard https://chrome.google.com/webstore/developer/dashboard .
