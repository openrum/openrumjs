# OpenRUM
[![Build Status](https://travis-ci.com/openrum/openrumjs.svg?branch=main)](https://travis-ci.com/openrum/openrumjs)

OpenRUM is an non-intrusive Real User Monitoring tool that will track Web Performance data from real users accessing your web application and report it to an endpoint to collect and process that data.

Some of the metrics you can collect using OpenRUM are:
- First Contentful Paint
- Largest Contentful Paint
- Cumulative Layout Shift
- Time To Interactive
- Time To First Byte
- Page Load Time

## Why it's non-intrusive

It uses the `sendBeacon()` method which was built with the purpose of sending analytics data.

With the `sendBeacon()` method, the data is transmitted asynchronously when the user agent has an opportunity to do so, without delaying unload or the next navigation. This means:

-   The data is sent reliably
-   It's sent asynchronously
-   It doesn't impact the loading of the next page

Read more about the sendBeacon() method [here](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)

[Official Site](https://openrum.io/ "Official Site")

## Development
In order to build OpenRUM you need to have installed node, gulp-cli.

1. Insall node: [Node Installer](https://nodejs.org/en/download/ "Node Installer")
2. Install gulp-cli
```bash
npm install --global gulp-cli
```
3. Intall node modules
```bash
npm install
```

## Build Development
In order to build development you need to run:

    npm start

or

    npm run build:dev

Once you run this command the development building process begins. When it finish a browser tab pointing to localhost:5000 is going to be open, loading the index.html file.

The application is going to be runned in watch mode so you can make changes and they gets automatically build and refresh in the browser.

IMPORTANT: The cdn dev urls are used.-

## Build Production

In order to build production you need to run:

    npm run build:prod

As output you get a openrum.min.js.

### Storing the data
To store the data, you can create your own server to process and send the data, or you can use the [OpenRUM-API](https://github.com/openrum/openrum-api) which will connecto to a MongoDB instance.
