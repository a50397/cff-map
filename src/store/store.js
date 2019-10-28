import Vue from 'vue'
import Vuex from 'vuex'
import { stationsApi } from '@/api/api-SBB'
import { parseStations } from './stationData'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stations: [],
    selectedStation: null,
    bounds: null
  },
  getters: {
    stationAddress: state => index =>
      index === null
        ? ''
        : (state.stations[index].address
          ? state.stations[index].address + ', '
          : '') + state.stations[index].city,
    stationServices: state => index =>
      index === null
        ? []
        : [
          ...(state.stations[index].service.includes('geldwechsel') || state.stations[index].service.includes('western union'))
            ? ['monetization_on'] : [],
          ...(state.stations[index].service.includes('businesstravel-service-center'))
            ? ['weekend'] : [],
          ...(state.stations[index].service.includes('gepäckaufbewahrung') || state.stations[index].service.includes('gepäckausgabe'))
            ? ['work'] : []
        ]
  },
  mutations: {
    setStations (state, context) {
      state.stations = context.stationList
    },
    setBounds (state, context) {
      state.bounds = context.bounds
    },
    setSelectedStation (state, context) {
      state.selectedStation = context.marker
    }
  },
  actions: {
    loadStations (context) {
      stationsApi.getStationsServices(0, 1) // get number os items
        .then(response => {
          const tasks = []
          for (let x = 0; x < response.data.nhits; x += 500) {
            tasks.push(stationsApi.getStationsServices(x, 500).catch(e => {}))
          }

          Promise.all(tasks)
            .then(resp =>
              resp.map(res => res.data.records).flat()
            )
            .then(data => {
              if (window.google) {
                context.commit('setBounds', { bounds: new window.google.maps.LatLngBounds() })
              }
              return parseStations(data, context.state.bounds)
            })
            .then(stationList =>
              context.commit('setStations', { stationList })
            )
            .catch(() => {
              context.commit('setStations', { stationList: [] })
              // push error
            })
        })
        .catch(() => {
          // push error
        })
    }
  }
})
