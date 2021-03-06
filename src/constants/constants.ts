const API_URL = process.env.API_URL || 'https://localhost:5100';
const DEBUG = process.env.DEBUG || 0;
const TIMESTAMPS = (process.env.TIMESTAMPS ? parseInt(process.env.TIMESTAMPS, 2) : 0);
const DOM_COMPLETE = process.env.DOM_COMPLETE || 1;
const DOM_CONTENT_LOADED = process.env.DOM_CONTENT_LOADED || 1;
const DOM_INTERACTIVE = process.env.DOM_INTERACTIVE || 1;
const DOM_LOADING = process.env.DOM_LOADING || 1;
const LATENCY = process.env.LATENCY || 1;
const LOAD = process.env.LOAD || 1;
const REQUEST = process.env.REQUEST || 1;
const RESPONSE = process.env.RESPONSE || 1;
const SECURE_CONNECTION = process.env.SECURE_CONNECTION || 1;
const TOTAL_PAGE_LOAD = process.env.TOTAL_PAGE_LOAD || 1;
const PAINT = process.env.PAINT || 1;
const DNS = process.env.DNS || 1;
const COMPRESSION = process.env.COMPRESSION || 1;
const TTFB = process.env.TTFB || 1;
const TRANSFER = process.env.TRANSFER || 1;

export {
  API_URL,
  DEBUG,
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
  TTFB,
  TRANSFER
};
