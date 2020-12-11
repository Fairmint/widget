# Steps to install

* Create a new DOM element with class name `fairmint-invest-widget`, where you want to replace the `Invest` button and the widget. _`(Do not use button element)`_
```
<div class="fairmint-invest-widget"></div>
```

* (Optional) You can apply your own style for the button (margin, padding, ...)
```
  .fairmint-invest-widget {
    margin: 0 10px;
  }
```

* Append following script into `body` element.

```
window.fairmintSettings = {
  org: 'fairmint', // This is your organization id
  width: 123, // Invest button width in pixel. default: 132
  height: 44, // Invest button height in pixel. default: 48
  mobileWidth: 36, // Invest button width in pixel for mobile. default: 36
  mobileHeight: 36, // Invest button height in pixel for mobile. default: 36
};

// Do not change below script.
window.addEventListener("load",(function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://static.fairmint.co/widget/fairmint.20201209.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}),!1);
```

Thats it! Enjoy your widget. 😀
