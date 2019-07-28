workbox.precaching.precacheAndRoute([{
  'revision': '17ecfaee522eaf5b3ad9c9aa1b2973cc',
  'url': '/manifest.json'
}])

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(new RegExp('^https://data.sbb.ch/api/'), workbox.strategies.cacheFirst({
  cacheName: 'api-cache'
}))
