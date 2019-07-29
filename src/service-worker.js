workbox.precaching.precacheAndRoute([{
  'revision': '17ecfaee522eaf5b3ad9c9aa1b2973cc',
  'url': '/manifest.json'
}])

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(
  new RegExp('^https://data.sbb.ch/api/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://maps.googleapis.com/maps-api-v3/api/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'gapi-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://maps.googleapis.com/maps/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'gmap-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
)
