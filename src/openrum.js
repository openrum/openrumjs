import prepareData from './utils/prepare-data';
import sendData from './utils/send-data';

let cls = 0;
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries() || [];
  entries.forEach((e) => {
    if (!e.hadRecentInput) {
      cls += e.value;
    }
  });
}).observe({ type: 'layout-shift', buffered: true });

window.addEventListener('load', () => {
  if ('performance' in window) {
    setTimeout(function() { init(); }, 0);
  }
});

function init() {
  const data = prepareData(performance);
  if (data) {
    data.cls = cls;
    sendData(data);
  }
}
