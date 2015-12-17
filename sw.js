(global => {
  'use strict';

  // Load the sw-tookbox library.
  importScripts('/bower_components/sw-toolbox/sw-toolbox.js');

  // Turn on debug logging, visible in the Developer Tools' console.
  global.toolbox.options.debug = true;

  // Precache the following items
  toolbox.precache([ '/images/info.svg', '/images/cv.svg', '/images/contact.svg', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js']);

  // The route for the images
  toolbox.router.get('/images/(.*)', global.toolbox.fastest, {
    cache: {
          name: 'svg',
          maxAgeSeconds: 86400 // cache for a day
        },
  });

  // The route for any requests from the googleapis origin
  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'googleapis',
      maxAgeSeconds: 86400 // cache for a day
    },
    origin: /\.googleapis\.com$/,
    // Set a timeout threshold of 2 seconds
    networkTimeoutSeconds: 2
  });

  // By default, all requests that don't match our custom handler will use the toolbox.networkFirst
  // cache strategy, and their responses will be stored in the default cache.
  global.toolbox.router.default = global.toolbox.networkFirst;

  // Boilerplate to ensure our service worker takes control of the page as soon as possible.
  global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
