import {
  TIMESTAMPS,
  DOM_COMPLETE,
  DOM_CONTENT_LOADED,
  DOM_INTERACTIVE,
  DOM_LOADING,
  LATENCY,
  LOAD,
  REQUEST,
  RESPONSE,
  SECURE_CONNECTION,
  TOTAL_PAGE_LOAD,
  PAINT,
  DNS,
  COMPRESSION,
  TTFB
} from '../constants/constants';
import getDeviceType from './device';

export default function prepareData() {
  const data = {};
  const timings = performance.timing;
  const pageNav = performance.getEntriesByType('navigation')[0];

  data.origin = window.location.href;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  data.effectiveConnectionType = (connection ? connection.effectiveType : null);
  data.device = getDeviceType();

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
  }

  if (DOM_COMPLETE === 1) {
    data.domLoad = timings.domComplete - timings.domLoading;
  }

  if (DOM_CONTENT_LOADED === 1) {
    data.domContentLoaded = timings.domContentLoadedEventEnd - timings.domLoading;
  }

  if (DOM_INTERACTIVE === 1) {
    data.timeToInteractive = timings.domInteractive - timings.domLoading;
    data.iteractiveToComplete = timings.domComplete - timings.domInteractive;
  }

  if (DOM_LOADING === 1) {
    data.domLoading = timings.domLoading;
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

  if ((PAINT === 1) && (performance.getEntriesByType('paint').length > 0)) {
    data.firstPaint = (performance.getEntriesByName('first-paint').length > 0 ?
      performance.getEntriesByName('first-paint')[0].startTime : null);
    data.firstContenfulPaint = (performance.getEntriesByName('first-contentful-paint').length > 0 ?
      performance.getEntriesByName('first-contentful-paint')[0].startTime : null);
    data.largestContentfulPaint = 0;
    const entries = performance.getEntries();
    for (let i = 0; i < entries.length; i++) {
      data.largestContentfulPaint = Math.max(data.largestContentfulPaint, entries[i].startTime);
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

  return data;
}
