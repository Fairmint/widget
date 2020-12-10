# Steps to install

* Create a new DOM element with id `fairmint-invest-widget`, where you want to replace the `Invest` button and the widget. _`(Do not use button element)`_
```
<div id="fairmint-invest-widget"></div>
```

* Append following script into `body` element.

```
window.fairmintSettings = {
  org: 'fairmint', // This is your organization id
  width: 123, // Invest button width in pixel. default: 132
  height: 44, // Invest button height in pixel. default: 48
};

window.addEventListener("load",(function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://static.fairmint.co/widget/fairmint.20201209.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}),!1);
```

Thats it! Enjoy your widget. 😀
