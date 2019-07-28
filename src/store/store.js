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
    stationAddress: state => index => {
      return index === null
        ? ''
        : (state.stations[index].address
          ? state.stations[index].address + ', '
          : '') + state.stations[index].city
    },
    stationServices: state => index => {
      return index === null
        ? []
        : [
          ...(state.stations[index].service.indexOf('geldwechsel') !== -1 || state.stations[index].service.indexOf('western union') !== -1)
            ? ['monetization_on'] : [],
          ...(state.stations[index].service.indexOf('businesstravel-service-center') !== -1)
            ? ['weekend'] : [],
          ...(state.stations[index].service.indexOf('gepäckaufbewahrung') !== -1 || state.stations[index].service.indexOf('gepäckausgabe') !== -1)
            ? ['work'] : []
        ]
    }
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
    async loadStations (context) {
      try {
        var stationList = []
        var nhits = 0

        do {
          let response = await stationsApi.getStationsServices(stationList.length, nhits || 500)
          nhits = response.data.nhits
          stationList = stationList.concat(response.data.records)
        } while (nhits > stationList.length)

        if (window.google) {
          var bounds = new window.google.maps.LatLngBounds()
          context.commit('setBounds', { bounds })
        }

        stationList = parseStations(stationList, bounds)
      } catch (error) {
        stationList = []
      }
      context.commit('setStations', { stationList })
    }
  }
})
