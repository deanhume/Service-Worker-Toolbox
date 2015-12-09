(global => {
  'use strict';

  // Load the sw-tookbox library.
  importScripts('/bower_components/sw-toolbox/sw-toolbox.js');

  // Turn on debug logging, visible in the Developer Tools' console.
  global.toolbox.options.debug = true;
  global.toolbox.options.networkTimeoutSeconds = 2;

  // Precache the following items
  //toolbox.precache([ '/images/info.svg', '/images/cv.svg', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js']);

  toolbox.router.get('/images/(.*)', global.toolbox.cacheFirst, {
    cache: {
          name: 'svg',
          // Store up to 10 entries in that cache.
          maxEntries: 10,
          // Expire any entries that are older than 30 seconds.
          maxAgeSeconds: 60
        },
  });

  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    // Use a dedicated cache for the responses, separate from the default cache.
    cache: {
      name: 'googleapis',
      // Store up to 10 entries in that cache.
      maxEntries: 10,
      // Expire any entries that are older than 30 seconds.
      maxAgeSeconds: 30
    },
    // origin allows us to restrict the handler to requests whose origin matches a regexp.
    // In this case, we want to match anything that ends in 'ytimg.com'.
    origin: /\.googleapis\.com$/
  });

  // By default, all requests that don't match our custom handler will use the toolbox.networkFirst
  // cache strategy, and their responses will be stored in the default cache.
  global.toolbox.router.default = global.toolbox.networkFirst;

  // Boilerplate to ensure our service worker takes control of the page as soon as possible.
  global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
