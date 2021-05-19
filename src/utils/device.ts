const os = [
    { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
    { name: 'Windows', value: 'Win', version: 'NT' },
    { name: 'iPhone', value: 'iPhone', version: 'OS' },
    { name: 'iPad', value: 'iPad', version: 'OS' },
    { name: 'Kindle', value: 'Silk', version: 'Silk' },
    { name: 'Android', value: 'Android', version: 'Android' },
    { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
    { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
    { name: 'Macintosh', value: 'Mac', version: 'OS X' },
    { name: 'Linux', value: 'Linux', version: 'rv' },
    { name: 'Palm', value: 'Palm', version: 'PalmOS' }
];

const header = [
    navigator.platform,
    navigator.userAgent,
    navigator.appVersion,
    navigator.vendor
];

function getDeviceType() : string {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return 'phone';
  }
  return 'desktop';
}

function getDeviceOS() : object {
    let regex;
    let regexv;
    let match;
    let matches;
    let version;
    const agent = header.join(' ');
    for (const d of os) {
      regex = new RegExp(d.value, 'i');
      match = regex.test(agent);
      if (match) {
          regexv = new RegExp(d.version + '[- \\/:;]?\s?([\\d._]+)', 'i');
          matches = agent.match(regexv);
          version = '';
          if (matches && matches[1]) {
            version = matches[1];
          } else {
              version = '0';
          }
          return {
              name: d.name,
              version
          };
      }
    }
    return { name: 'unknown', version: 0 };
}



export {
  getDeviceType,
  getDeviceOS
};
