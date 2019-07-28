/*
External API related functions
*/

import axios from 'axios'

const SBB_URL = 'https://data.sbb.ch/api/records/1.0/search/'

const headers = {
  'Content-Type': 'application/json'
}

const server = axios.create({
  baseURL: SBB_URL,
  headers: headers
})

const stationsApi = {
  getStationsServices: function (start, rows) {
    return server.get(`?dataset=kontaktadressen&lang=en&facet=service&rows=${rows}&start=${start}`)
  }
}

export { stationsApi }
