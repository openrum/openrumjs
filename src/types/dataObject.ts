import { DeviceObject } from "./deviceObject";

export class DataObject {
  cls? : number;
  connectStart? : number;
  connectEnd? : number;
  domComplete? : number;
  domContentLoadedEventStart? : number;
  domContentLoadedEventEnd? : number;
  domInteractive? : number;
  domainLookupStart? : number;
  domainLookupEnd? : number;
  fetchStart? : number;
  loadEventStart? : number;
  loadEventEnd? : number;
  navigationStart? : number;
  redirectStart? : number;
  redirectEnd? : number;
  requestStart? : number;
  responseStart? : number;
  responseEnd? : number;
  secureConnectionStart? : number;
  unloadEventStart? : number;
  unloadEventEnd? : number;
  domLoading? : number;
  origin? : string;
  effectiveConnectionType? : string;
  device? : DeviceObject;
  domLoad? : number;
  fullyLoad? : number;
  compressionRatio? : number;
  ttfb? : number;
  dnsLookup? : number;
  firstPaint? : number;
  firstContenfulPaint? : number;
  largestContentfulPaint? : number;
  pageLoadTime? : number;
  tlsTime? : number;
  responseTime? : number;
  requestResponseTime? : number;
  requestTime? : number;
  loadTime? : number;
  domContentLoaded? : number;
  browser? : string;
  timeToInteractive? : number;
  iteractiveToComplete? : number;
  latency? : number;
  transferSize? : number;

  constructor(cls? : number) {
    cls = cls;
  };
}
