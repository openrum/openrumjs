/* global opr */
export default function getBrowser() {
  // Opera 8.0+
  if ((!!window.opr && !!opr.addons) || !!window.opera ||
  navigator.userAgent.indexOf(' OPR/') >= 0) {
    return 'Opera';
  }

  // Firefox 1.0+
  if (typeof InstallTrigger !== 'undefined') {
    return 'Firefox';
  }

  // Safari 3.0+ "[object HTMLElementConstructor]"
  if (/constructor/i.test(window.HTMLElement) ||
   (function(p) {
     return p.toString() ===
            '[object SafariRemoteNotification]';
   }(!window.safari ||
       (typeof safari !== 'undefined' && window.safari.pushNotification)))) {
    return 'Safari';
  }

  // Internet Explorer 6-11
  let isIE = false;
  if (/* @cc_on!@ */false || !!document.documentMode) {
    isIE = true;
    return 'IE';
  }
  if (!isIE && !!window.StyleMedia) {
    return 'Edge';
  }

  // Chrome 1 - 79
  if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) {
    // Edge (based on chromium) detection
    if (navigator.userAgent.indexOf('Edg') !== -1) {
      return 'EdgeChromium';
    }
    return 'Chrome';
  }
}
