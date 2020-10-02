chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
          console.log("free the forward blocking  " + details.url);
          return {cancel: true};
        },
        {urls: [
          "*://*.lightboxcdn.com/*",
          ] },
        ["blocking"]);

chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
          for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
              details.requestHeaders[i].value = "Googlebot/2.1 (+http://www.googlebot.com/bot.html)";
              break;
            }
          }
          return {requestHeaders: details.requestHeaders};
        },
        {urls: [
          "*://forward.com/*",
        ]},
        ["blocking", "requestHeaders"]);

chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
          for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'Referer') {
              details.requestHeaders.splice(i, 1);
              break;
            }
          }
          return {requestHeaders: details.requestHeaders};
        },
        {urls: [
          "*://forward.com/*",
        ] },
        ["blocking", "requestHeaders"]);

chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
          var j = 0;
          for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'Cookie') {
              details.requestHeaders.splice(i, 1);
              j = j+1;
            }
            if( j > 0 ) { console.log("Cookies : " + j); }
          }
          return {requestHeaders: details.requestHeaders};
        },
        {urls: [
          "*://forward.com/*",
        ] },
        ["blocking", "requestHeaders"]);

