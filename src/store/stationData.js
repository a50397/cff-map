function parseStations (records, bounds) {
  var stations = new Map()
  records.forEach(station => {
    try {
      if (!stations.has(station.fields.didok)) {
        stations.set(station.fields.didok, {
          name: station.fields.stationsbezeichnung,
          address: (station.fields.adresse ? station.fields.adresse +
            (station.fields.nummer ? ' ' + station.fields.nummer : '') : ''),
          city: station.fields.ort ? station.fields.ort : '',
          number: station.fields.nummer ? station.fields.nummer : '',
          mail: station.fields.mail ? station.fields.mail : '',
          position: {
            lat: parseFloat(station.fields.geopos[0]),
            lng: parseFloat(station.fields.geopos[1])
          },
          service: []
        })
        if (bounds) {
          bounds.extend(stations.get(station.fields.didok).position)
        }
      }
      if (station.fields.service) {
        stations.get(station.fields.didok).service = stations.get(station.fields.didok).service
          .concat(station.fields.service.split(',').map(l => l.toLowerCase().trim()))
      }
    } catch (error) {
    }
  })

  return Array.from(stations, station => station[1]).sort((a, b) => a.name.localeCompare(b.name))
}

export {
  parseStations
}
