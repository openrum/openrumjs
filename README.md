# OpenRUM
[![Build Status](https://travis-ci.com/openrum/openrumjs.svg?branch=main)](https://travis-ci.com/openrum/openrumjs)

This library...

[Official Site](https://piio.co/ "Official Site")

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
