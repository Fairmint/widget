const generateCSS = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .fairmint-widget-container div, .fairmint-widget-container iframe, .fairmint-widget-container span {
      border: none;
    }

    .fairmint-widget-frame {
      z-index: 99999999;
      position: fixed;
      bottom: 100px;
      right: 20px;
      min-width: 370px;
      min-height: 700px;
    }

    .fairmint-widget-frame iframe {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  `;
  document.getElementsByTagName('head')[0].appendChild(style);
}

const generateIframe = () => {
  const container = document.createElement('div');
  container.className = 'fairmint-widget-container';

  const widgetFrame = document.createElement('div');
  widgetFrame.className = 'fairmint-widget-frame' ;

  const iframe = document.createElement('iframe');
  iframe.name = 'fairmint-widget-frame';
  iframe.allowFullscreen = true;
  iframe.title = 'CAFE Offering Widget';

  widgetFrame.appendChild(iframe);
  container.appendChild(widgetFrame);
  document.getElementsByTagName('body')[0].appendChild(container);

  // The real widget html contents go here - you can include add css/javascript files as well
  // Do not use iframe.src attribute for the security. Its recommended to write the iframe document manually.
  // At least you can read the widget contents from file.
  iframe.contentWindow.document.write(`
    <html>
      <head>
        <style>
          body {
            margin: 0;
            border: 1px solid black;
          }
        </style>
      </head>
      <body>
        Hello world
      </body>
    </html>
  `);
}

(function () {
  // TODO Do APP_ID validation here
  if (!window.fairmintSettings || !window.fairmintSettings.app_id) {
    console.error('Failed to initialize CAFE offering widget! Please contact fairmint support team.')
    return;
  }
  
  generateCSS()
  generateIframe()
})();
