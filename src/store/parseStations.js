function parseStations (records, bounds) {
  const stations = records.reduce((stations, record) => {
    stations.set(record.fields.didok, {
      ...stations.get(record.fields.didok),
      ...(record.fields.stationsbezeichnung ? { name: record.fields.stationsbezeichnung } : {}),
      ...(record.fields.adresse ? { address: record.fields.adresse } : {}),
      ...(record.fields.ort ? { city: record.fields.ort } : {}),
      ...(record.fields.nummer ? { number: record.fields.nummer } : {}),
      ...(record.fields.mail ? { mail: record.fields.mail } : {}),
      ...(record.fields.geopos ? { position: {
        lat: parseFloat(record.fields.geopos[0]),
        lng: parseFloat(record.fields.geopos[1])
      } } : {})
    })
    if (record.fields.geopos && bounds) {
      bounds.extend(stations.get(record.fields.didok).position)
    }
    if (record.fields.service) {
      if (!stations.get(record.fields.didok).service) {
        stations.get(record.fields.didok).service = []
      }
      stations.get(record.fields.didok).service = [
        ...stations.get(record.fields.didok).service,
        ...record.fields.service.split(',').map(l => l.toLowerCase().trim())
      ]
    }
    return stations
  }, new Map())

  return Array.from(stations, station => station[1]).filter(station => station.position).sort((a, b) => a.name.localeCompare(b.name))
}

export {
  parseStations
}
