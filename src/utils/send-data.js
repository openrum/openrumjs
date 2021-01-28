import {
  API_URL
} from '../constants/constants';

export default function sendData(data) {
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
