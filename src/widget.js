import { isLg, isSm, widgetHTML } from './common';

const { fairmintSettings } = window;
let offeringStatus;

const isEmbed = fairmintSettings.type === 'embed';

const buttonBackground = () => {
  if (!isLg()) {
    return offeringStatus.company_icon_logo_mobile;
  }
  return offeringStatus.company_icon_logo_desktop;
};

const buttonColor = () => {
  return offeringStatus.color_button ? offeringStatus.color_button  : 'rgb(244, 159, 15)';
};

const investors = () => {
  return offeringStatus.investors ? offeringStatus.investors.length : 0;
};

const itemsCount = () => {
  let count = 0;
  if (fairmintSettings.amountInvested) {
    count++;
  }

  if (fairmintSettings.companyValuation) {
    count++;
  }

  if (fairmintSettings.performance) {
    count++;
  }

  return count;
};

const getFrameHeight = () => (investors() >= 5 ? 459 : 366) + itemsCount() * 40 + 4;

const generateCSS = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .fairmint-invest-widget {
      position: relative;
      display: ${isEmbed ? 'flex' : 'inline-flex'};
      min-width: ${isEmbed ? 336 : 0}px;
      min-height: ${isEmbed ? getFrameHeight() : 0}px;
    }

    .fairmint-widget-container div, .fairmint-widget-container iframe, .fairmint-widget-container span {
      border: none;
    }

    .fairmint-widget-frame {
      z-index: 99999999;
      position: ${isEmbed ? 'absolute' : 'fixed'};
      min-width: 336px;
      min-height: ${getFrameHeight()}px;
      padding-top: ${!isEmbed ? 4 : 0}px;
      visibility: hidden;
      box-shadow: 0px 0px 3px rgba(5, 5, 5, 0.04), 28px 28px 88px rgba(0, 0, 0, 0.08);
    }

    .fairmint-widget-frame-visible {
      visibility: visible;
    }

    .fairmint-widget-frame iframe {
      width: 100%;
      height: 100%;
      position: absolute;
    }

    .fairmint-invest-button {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      background: ${buttonColor()};
      box-shadow: 0 0 0 0 rgba(34,36,38,.15) inset;
      color: white;
      text-shadow: none;
      outline: 0;
      border: none;
      vertical-align: baseline;
      font-style: normal;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: normal;
      position: relative;
      background-position: center;
      transition: background 0.8s;
      width: ${fairmintSettings.width ? fairmintSettings.width : 132 }px;
      height: ${fairmintSettings.height ? fairmintSettings.height : 48 }px;
    }

    .fairmint-invest-button.fairmint-invest-button-icon-only {
      width: auto;
      height: auto;
      padding: 0;
      background: transparent;
    }

    .fairmint-invest-button.fairmint-invest-button-icon-only .fairmint-invest-button-wrapper span {
      display: none;
    }

    .fairmint-invest-button.fairmint-invest-button-icon-only .fairmint-invest-button-wrapper img.fairmint-invest-button-img {
      margin: 0;
      width: ${fairmintSettings.mobileWidth ? fairmintSettings.mobileWidth : 36 }px;
      height: ${fairmintSettings.mobileHeight ? fairmintSettings.mobileHeight : 36 }px;
    }

    .fairmint-invest-button-wrapper {
      display: inline-flex;
      margin: auto;
      justify-content: center;
      align-items: center;
    }

    .fairmint-invest-button-img {
      margin-left: 8px;
      width: 28px;
    }

    @media screen and (max-width: 992px) {
      .fairmint-invest-button {
        width: auto;
        height: auto;
        padding: 0;
        background: transparent;
      }

      .fairmint-invest-button-wrapper span {
        display: none;
      }

      .fairmint-invest-button-wrapper img.fairmint-invest-button-img {
        margin: 0;
        width: ${fairmintSettings.mobileWidth ? fairmintSettings.mobileWidth : 36 }px;
        height: ${fairmintSettings.mobileHeight ? fairmintSettings.mobileHeight : 36 }px;
      }
    }
  `;
  document.getElementsByTagName('head')[0].appendChild(style);
};

const getIframePosition = (investButton) => {
  if (isEmbed) {
    return `
      top: 0;
      left: 0;
    `;
  }

  if (!isSm()) {
    return `
      top: 0;
      left: 0;
      right: 0;
    `;
  }
  
  const buttonClientRect = investButton.getBoundingClientRect();
  return `
    top: ${buttonClientRect.y + buttonClientRect.height}px;
    left: ${buttonClientRect.x + buttonClientRect.width - 336}px;
  `;
};

const getIframeContent = (containerIndex) => {
  let content = widgetHTML;
  content = content.replace('#CLOSE_BTN_VISIBLE_CLASS#', !isSm() && !isEmbed ? 'fairmint-cafe-widget-close-btn-visible' : '');
  content = content.replace('#CONTAINER_INDEX#', containerIndex);
  content = content.replace('#BORDER_RADIUS#', isSm() || isEmbed ? 4 : 0);
  content = content.replace(/#COLOR1#/g, offeringStatus.color1 ? offeringStatus.color1 : 'rgb(86, 41, 182)');
  content = content.replace('#COLOR2#', offeringStatus.color2 ? offeringStatus.color2 : 'rgb(117, 73, 211)');
  content = content.replace('#COMPANY_NAME_LOGO#', offeringStatus.company_name_logo);
  content = content.replace('#CAFE_LOGO#', offeringStatus.cafe_logo);
  content = content.replace('#CAFE_NAME#', offeringStatus.cafe_name);
  content = content.replace('#LATEST_PRICE#', (offeringStatus.latest_price || 0).toFixed(2));
  content = content.replace('#SIGNUP_URL#', offeringStatus.signup_url);
  content = content.replace('#SIGNIN_URL#', offeringStatus.signin_url);
  content = content.replace('#COLOR_BTN#', buttonColor());

  if (fairmintSettings.amountInvested) {
    content = content.replace('#AMOUNT_INVESTED#', Math.round(offeringStatus.amount_invested).toLocaleString());
    content = content.replace('#AMOUNT_INVESTED_VISIBLE#', '');
  } else {
    content = content.replace('#AMOUNT_INVESTED_VISIBLE#', 'fairmint-cafe-widget-card-invisible');
  }

  if (fairmintSettings.companyValuation) {
    content = content.replace('#COMPANY_VALUATION#', Math.round(offeringStatus.company_valuation).toLocaleString());
    content = content.replace('#COMPANY_VALUATION_VISIBLE#', '');
  } else {
    content = content.replace('#COMPANY_VALUATION_VISIBLE#', 'fairmint-cafe-widget-card-invisible');
  }

  if (fairmintSettings.performance) {
    content = content.replace('#PERFORMANCE#', (offeringStatus.performance || 0).toFixed(1));
    content = content.replace('#PERFORMANCE_VISIBLE#', '');
  } else {
    content = content.replace('#PERFORMANCE_VISIBLE#', 'fairmint-cafe-widget-card-invisible');
  }

  let investorsDom = '';
  if (investors() >= 5) {
    investorsDom +=
      `<div class="fairmint-cafe-widget-card-investors">
        <div class="fairmint-cafe-widget-card-investors-label">
          Join our `;
    investorsDom += offeringStatus.owners;
    investorsDom += ` investors:
        </div>
        <div class="fairmint-cafe-widget-card-investors-list">`;
    for (const investor of offeringStatus.investors.slice(0, 5)) {
      investorsDom += '<div class="fairmint-cafe-widget-card-investor-avatar">';
      investorsDom += `<img alt="" src="${investor.picture}" />`;
      investorsDom += '</div>';
    }
    investorsDom += `
      <div class="fairmint-cafe-widget-card-investor-avatar">
        YOU
      </div>
      </div>
    </div>`;
  }
  content = content.replace('#INVESTORS#', investorsDom);
  return content;
};

const generateIframe = (investButton, containerIndex) => {
  const container = document.createElement('div');
  container.className = 'fairmint-widget-container';

  const widgetFrame = document.createElement('div');
  widgetFrame.className = 'fairmint-widget-frame' ;
  widgetFrame.style.cssText = getIframePosition(investButton);

  if (isEmbed) {
    widgetFrame.classList.add('fairmint-widget-frame-visible');
  }

  const iframe = document.createElement('iframe');
  iframe.name = 'fairmint-widget-frame';
  iframe.allowFullscreen = true;
  iframe.title = 'CAFE Offering Widget';

  widgetFrame.appendChild(iframe);
  container.appendChild(widgetFrame);

  if (isEmbed) {
    investButton.appendChild(container);
  } else {
    document.getElementsByTagName('body')[0].appendChild(container);
  }

  iframe.contentWindow.document.write(getIframeContent(containerIndex));

  const showFrame = (e) => {
    e.preventDefault();
    e.stopPropagation();
    widgetFrame.classList.add('fairmint-widget-frame-visible');
  };
  const hideFrame = (e) => {
    e.preventDefault();
    e.stopPropagation();
    widgetFrame.classList.remove('fairmint-widget-frame-visible');
  };
  const toggleFrame = (e) => {
    e.preventDefault();
    e.stopPropagation();
    widgetFrame.classList.toggle('fairmint-widget-frame-visible');
  };
  const noAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const setHandlers = () => {
    if (isSm()) {
      investButton.onmouseover = showFrame;
      investButton.onmouseout = hideFrame;
      widgetFrame.onmouseover = showFrame;
      widgetFrame.onmouseout = hideFrame;
      investButton.onclick = noAction;
    } else {
      investButton.onmouseover = noAction;
      investButton.onmouseout = noAction;
      widgetFrame.onmouseover = noAction;
      widgetFrame.onmouseout = noAction;
      investButton.onclick = toggleFrame;
    }
  };

  if (!isEmbed) {
    setHandlers();
  }

  window.addEventListener('resize', () => {
    widgetFrame.style.cssText = getIframePosition(investButton);
    if (iframe.contentWindow) {
      iframe.contentWindow.document.body.innerHTML = '';
      iframe.contentWindow.document.write(getIframeContent(containerIndex));
    }

    if (!isEmbed) {
      setHandlers();
    }
  });
};

const generateButton = (container, containerIndex, isIcon = false) => {
  const button = document.createElement('button');
  button.className = 'fairmint-invest-button';
  if (isIcon) {
    button.classList.add('fairmint-invest-button-icon-only');
  }
  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'fairmint-invest-button-wrapper';

  const buttonText = document.createElement('span');
  buttonText.textContent = 'Invest';

  const buttonImage = document.createElement('img');
  buttonImage.src = buttonBackground();
  buttonImage.className = 'fairmint-invest-button-img';

  buttonWrapper.appendChild(buttonText);
  buttonWrapper.appendChild(buttonImage);
  button.appendChild(buttonWrapper);
  container.appendChild(button);

  generateIframe(button, containerIndex);

  window.addEventListener('resize', () => {
    buttonImage.src = buttonBackground();
  });
};

const generateWidget = (container, containerIndex) => {
  if (isEmbed) {
    generateIframe(container, containerIndex, true);
  } else if (fairmintSettings.type === 'icon') {
    generateButton(container, containerIndex, true);
  } else { // button
    generateButton(container, containerIndex);
  }
};

(function () {
  if (!fairmintSettings || !fairmintSettings.org) {
    console.error('Failed to initialize CAFE offering widget! Please contact fairmint support team.');
    return;
  }

  const widgetContainers = document.getElementsByClassName('fairmint-invest-widget');

  if (!widgetContainers) {
    console.error('Couldn\'t find \'fairmint-invest-widget\' DOM element!');
    return;
  }

  const stage = fairmintSettings.stage === 'production' ?
    'invest' : (
      fairmintSettings.stage === 'staging' ? 'preview' : 'dev'
    );

  fetch(`https://api.${stage}.fairmint.co/service1/offering/status?orgId=${fairmintSettings.org}`)
    .then(res => res.json())
    .then(res => {
      offeringStatus = res;

      generateCSS();

      for (let i = 0; i < widgetContainers.length; i++) {
        if (!widgetContainers[i].childNodes.length) {
          generateWidget(widgetContainers[i], i);
        }
      }
    })
    .catch(err => {
      console.error(err);
      console.error('Failed to initialize CAFE offering widget! Please contact fairmint support team.');
    });
})();
