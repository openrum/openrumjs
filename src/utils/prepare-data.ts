import {
  TIMESTAMPS,
  DOM_COMPLETE,
  DOM_CONTENT_LOADED,
  DOM_INTERACTIVE,
  LATENCY,
  LOAD,
  REQUEST,
  RESPONSE,
  SECURE_CONNECTION,
  TOTAL_PAGE_LOAD,
  PAINT,
  DNS,
  COMPRESSION,
  TTFB,
  TRANSFER
} from '../constants/constants';
import { getDeviceType, getDeviceOS } from './device';
import { getBrowser } from './browser';
import { DataObject } from '../types/dataObject';

declare var navigator : any;

function prepareData(performanceObject : any ) : DataObject {
  if (!performanceObject ||
    (typeof performanceObject !== 'object') || (performanceObject === null)) {
      throw new Error('Performance object is empty');
  }
  const data : DataObject = new DataObject();
  const timings = performanceObject.timing;
  const pageNav = (typeof performanceObject.getEntriesByType === 'function' ?
    performanceObject.getEntriesByType('navigation')[0] : null);
  const paint = (typeof performanceObject.getEntriesByType === 'function' ?
    performance.getEntriesByType('paint') : undefined);

  data.origin = (window ? window.location.href : undefined);
  if (navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    data.effectiveConnectionType = (connection ? connection.effectiveType : undefined);
  }

  data.device = {
    'type': getDeviceType(),
    'os': getDeviceOS(),
    'touchPoints': (navigator.maxTouchPoints ? navigator.maxTouchPoints : 0),
    'pixelRatio': devicePixelRatio || 1
  }
  data.browser = getBrowser();

  if (TIMESTAMPS === 1) {
    data.connectStart = timings.connectStart;
    data.connectEnd = timings.connectEnd;
    data.domComplete = timings.domComplete;
    data.domContentLoadedEventStart = timings.domContentLoadedEventStart;
    data.domContentLoadedEventEnd = timings.domContentLoadedEventEnd;
    data.domInteractive = timings.domInteractive;
    data.domainLookupStart = timings.domainLookupStart;
    data.domainLookupEnd = timings.domainLookupEnd;
    data.fetchStart = timings.fetchStart;
    data.loadEventStart = timings.loadEventStart;
    data.loadEventEnd = timings.loadEventEnd;
    data.navigationStart = timings.navigationStart;
    data.redirectStart = timings.redirectStart;
    data.redirectEnd = timings.redirectEnd;
    data.requestStart = timings.requestStart;
    data.responseStart = timings.responseStart;
    data.responseEnd = timings.responseEnd;
    data.secureConnectionStart = timings.secureConnectionStart;
    data.unloadEventStart = timings.unloadEventStart;
    data.unloadEventEnd = timings.unloadEventEnd;
    data.domLoading = timings.domLoading;
  }

  if (DOM_COMPLETE === 1) {
    data.domLoad = timings.domComplete - timings.domLoading;
    data.fullyLoad = timings.domComplete - timings.responseStart;
  }

  if (DOM_CONTENT_LOADED === 1) {
    data.domContentLoaded = timings.domContentLoadedEventEnd - timings.domLoading;
  }

  if (DOM_INTERACTIVE === 1) {
    data.timeToInteractive = timings.domInteractive - timings.domLoading;
    data.iteractiveToComplete = timings.domComplete - timings.domInteractive;
  }

  if (LATENCY === 1) {
    data.latency = timings.responseStart - timings.fetchStart;
  }

  if (LOAD === 1) {
    data.loadTime = timings.loadEventEnd - timings.loadEventStart;
  }

  if (REQUEST === 1) {
    data.requestTime = timings.responseStart - timings.requestStart;
    data.requestResponseTime = timings.responseEnd - timings.requestStart;
  }
  if (RESPONSE === 1) {
    data.responseTime = timings.responseEnd - timings.responseStart;
  }

  if ((SECURE_CONNECTION === 1) && (timings.secureConnectionStart > 0)) {
    data.tlsTime = timings.connectEnd - timings.secureConnectionStart;
  }

  if (TOTAL_PAGE_LOAD === 1) {
    data.pageLoadTime = timings.loadEventStart - timings.navigationStart;
  }

  if ((PAINT === 1) && (paint)) {
    data.firstPaint = (paint.length > 0 ?
      paint[0].startTime : undefined);
    data.firstContenfulPaint = (paint.length > 1 ?
      paint[1].startTime : undefined);
    data.largestContentfulPaint = 0;
    const entries : PerformanceEntryList = performance.getEntries();
    for (const entry of entries) {
      data.largestContentfulPaint = Math.max(data.largestContentfulPaint, entry.startTime);
    }
  }

  if (DNS === 1) {
    data.dnsLookup = timings.domainLookupEnd - timings.domainLookupStart;
  }

  if ((COMPRESSION === 1) && (pageNav)) {
    data.compressionRatio = pageNav.decodedBodySize / pageNav.encodedBodySize;
  }

  if (TTFB === 1) {
    data.ttfb = timings.responseStart - timings.navigationStart;
  }

  data.transferSize = 0;
  if (TRANSFER === 1) {
    const resources : PerformanceEntryList = performance.getEntriesByType("resource");
    for (const resource of resources) {
      data.transferSize += ((resource as any).transferSize ? (resource as any).transferSize : 0);
    }
  }

  return data;
}

export { prepareData }
