import { expect } from 'chai'
import { stationsApi } from '../../src/api/api-SBB'

describe('api-SBB', () => {
  it('should return 200 and list of stations', async function () {
    const stations = await stationsApi.getStationsServices(0, 500)

    expect(stations.status).to.be.equal(200)
    expect(stations.data.records.length).to.be.equal(500)
  })
})
