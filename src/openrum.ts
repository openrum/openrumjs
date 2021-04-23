import { prepareData } from './utils/prepare-data';
import { sendData } from './utils/send-data';
import { DataObject } from './types/dataObject';
import { DEBUG } from './constants/constants';

let cls = 0;
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries() || [];
  entries.forEach((e : any) => {
    if (!e.hadRecentInput) {
      cls += e.value;
      if (DEBUG) {
        console.log('Current CLS value:', cls, e);
      }
    }
  });
}).observe({ type: 'layout-shift', buffered: true });

window.addEventListener('load', () => {
  if ('performance' in window) {
    setTimeout(() => { init(); }, 0);
  }
});

function init() {
  const data : DataObject = prepareData(performance);
  if (data) {
    data.cls = cls;
    sendData(data);
  }
}
