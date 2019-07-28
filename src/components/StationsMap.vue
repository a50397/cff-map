/* Google maps showing stations location */

<template>
  <GmapMap
    ref="stationsMap"
    role="geomap"
    :center="center"
    :zoom="zoom"
    class="map"
    :options="{
      streetViewControl: false
    }"
  >
    <gmap-cluster :zoom-on-click="true">
      <gmap-marker
        v-for="(m, index) in stations"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="onClickOnMarker(index)"
        :key="index"
      ></gmap-marker>
    </gmap-cluster>
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      :closed="closeInfoWindow"
      @closeclick="closeInfoWindow"
    >
     <md-card class="info-window">
        <div class="md-title">{{ selectedMarker.name }}</div>
        <div class="md-subhead">{{ stationAddress(selectedStation) }}</div>
        <br />
        <br />
        <div class="md-subhead">{{ selectedMarker.mail }}</div>
        <md-icon v-for="service in stationServices(selectedStation)" :key="service" class="md-size-1x">{{ service }}</md-icon>
      </md-card>
    </gmap-info-window>
  </GmapMap>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: "StationsMap",
  data() {
    return {
      center: { lat: 46.522115, lng: 6.633095 },
      zoom: 8,
      selectedMarker: {
        name: "",
        address: "",
        city: "",
        mail: "",
        service: []
      },
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  computed: {
    ...mapState(['selectedStation', 'stations', 'bounds']),
    ...mapGetters(['stationAddress', 'stationServices'])
  },
  watch: {
    stations() {
      this.panToBounds()
    },
    /* Watch station selected in the list */
    selectedStation(newVal, oldVal) {
      if (newVal !== null) {
        if (oldVal !== newVal) {}
        this.selectMarker(this.stations[newVal], newVal)
      }
    }
  },
  methods: {
    onClickOnMarker(index) {
      if (index !== this.currentMidx) {
        this.$store.commit("setSelectedStation", { marker: index });
      } else {
        this.infoWinOpen = !this.infoWinOpen
      }
      
    },
    selectMarker(marker, index) {
      this.$refs.stationsMap.$mapPromise.then(map => {
        map.panTo(marker.position)
      })
      this.infoWindowPos = marker.position
      this.selectedMarker = marker
      this.infoWinOpen = true
      this.currentMidx = index
    },
    closeInfoWindow() {
      this.infoWinOpen = false
    },
    panToBounds() {
      if (this.bounds) {
        this.$refs.stationsMap.$mapPromise.then(map => {
          map.fitBounds(this.bounds)
          map.panToBounds(this.bounds)
        });
      }
    }
  }
};
</script>

<style scoped>

.map {
  width: 100%;
  height: 50vh;
}

.name-font {
  font-size: 24px;
  font-weight: 700;
}

.info-window {
  text-align: left;
}

</style>


