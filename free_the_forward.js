chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var url_parts = details.url.split('?');
    if (url_parts[1]) {
      return {
        redirectUrl: url_parts[0]
      }
    }
  },
  {
    urls: [
      'http://*.forward.com/*',
      'https://*.forward.com/*',
    ]
  },
  [
    'blocking',
  ]
);


chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders[i].value = 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)';
        break;
      }
    }

    return {
      requestHeaders: details.requestHeaders
    };
  },
  {
    urls: [
      'http://*.forward.com/*',
      'https://*.forward.com/*',
    ]
  },
  [
    'blocking',
    'requestHeaders'
  ]
);


