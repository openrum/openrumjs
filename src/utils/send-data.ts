import { API_URL } from '../constants/constants';
import { DataObject } from '../types/dataObject';

function sendData(data : DataObject) : void {
  let notBeacon = true;
  const send = JSON.stringify(data);
  // Check for sendBeacon support:
  if ('sendBeacon' in navigator) {
    // Beacon the requested
    if (navigator.sendBeacon(API_URL, send)) {
      notBeacon = false;
    }
  }
  if (notBeacon) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL, true);
    xhr.send(send);
  }
}

export { sendData }
