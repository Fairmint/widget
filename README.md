# Fairmint Investment Widget

## Development
1. Run in terminal: `yarn`
2. Then: `yarn start`
3. Navigate [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Build & Deploy
1. Run in terminal: `yarn build`
2. Rename `widget.js` file inside `dist` folder and upload to S3

## Steps to install

- Create a new DOM element with class name `fairmint-invest-widget`, where you want to replace the `Invest` button and the widget. _`(Do not use button element)`_

```
<div class="fairmint-invest-widget"></div>
```

- (Optional) You can apply your own style for the button (margin, padding, ...)

```
  .fairmint-invest-widget {
    margin: 0 10px;
  }
```

- Append following script into `body` element.

```
window.fairmintSettings = {
  org: 'fairmint', // This is your organization id
  stage: 'production',
  width: 123, // Invest button width in pixel. default: 132
  height: 44, // Invest button height in pixel. default: 48
  mobileWidth: 36, // Invest button width in pixel for mobile. default: 36
  mobileHeight: 36, // Invest button height in pixel for mobile. default: 36
};

// Do not change below script.
window.addEventListener("load",(function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://static.fairmint.co/widget/fairmint.latest.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}),!1);
```

Thats it! Enjoy your widget. 😀

## (Optional) React Integration

If you are going to use this widget in the modern frontend frameworks like React or Angular, the above snippset wouldn't re-render the widget on the parent component refreshes. So you will also need to build an extra component to handle the component re-render.

- React Component Example

```
import React,  { useEffect } from 'react'

const CAFEWidget = () => {
  useEffect(() => {
    window.fairmintSettings = {
      org: 'fairmint',
      width: 122,
      height: 36,
      stage: 'production'
    };

    const script = document.createElement('script');
    script.id = "fairmint-widget-init-script"
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://static.fairmint.co/widget/fairmint.latest.js';

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

    return () => {
      script.remove();

      const widgetContainers = document.getElementsByClassName('fairmint-widget-container');
      for (let i = 0; i < widgetContainers.length; i++) {
        widgetContainers[i].remove();
      }
    }
  }, []);

  return <div className="fairmint-invest-widget" />;
}

export default CAFEWidget

```

And use this component like this instead of creating a new DOM element with class name `fairmint-invest-widget`:

```
  <CAFEWidget />
```
