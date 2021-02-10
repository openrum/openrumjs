import prepareData from './utils/prepare-data';
import sendData from './utils/send-data';

window.addEventListener('load', () => {
  if ('performance' in window) {
    setTimeout(function() { init(); }, 0);
  }
});

function init() {
  const data = prepareData(performance);
  if (data) {
    sendData(data);
  }
}
