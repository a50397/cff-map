/* Setup librraries and bootstrap the application */

import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import { MdCard, MdList, MdIcon, MdProgress } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster' // replace src with dist if you have Babel issues
import './registerServiceWorker'

Vue.config.productionTip = true

/* GMap related */
Vue.use(VueGoogleMaps, {
  load: {
    key: '', // Needs the GMAPS API KEY
    libraries: 'places'
  }
})
Vue.component('GmapCluster', GmapCluster)

/* Other libraries */
Vue.use(MdCard)
Vue.use(MdList)
Vue.use(MdIcon)
Vue.use(MdProgress)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
