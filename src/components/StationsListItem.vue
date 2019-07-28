/* 
Station detail to be used within StationsList component 
*/

<template>
  <md-list-item @click="stationItemSelected" role="listitem">
    <div class="md-list-item-text">
      <span class="name-font">{{ station.name }}</span>
      <span class="address-font">{{ stationAddress(index) }}</span>
    </div>
    <div class="md-list-item-text push-text-right">
      <span class="mail-font">{{ station.mail }}</span>
      <span>
        <md-icon v-for="service in stationServices(index)" :key="service" class="md-size-1x service-icon">{{ service }}</md-icon>
      </span>
    </div>
  </md-list-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "StationsListItem",
  props: {
    station: Object,
    index: Number
  },
  computed: {
    ...mapGetters(['stationAddress', 'stationServices'])
  },
  methods: {
    stationItemSelected() {
      /* set selected station in store */
      this.$store.commit("setSelectedStation", { marker: this.index })
      /* Global object window - scroll window to top to see map*/
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style scoped>

.push-text-right {
  text-align: right;
}

.name-font {
  font-weight: bold; 
  font-size: x-large;
}

.address-font {
  font-size: large;
}

.mail-font {
  font-size: small; 
  margin-bottom: 5px;
}

.service-icon {
  justify-content: flex-end; 
  width: 24px;
}

</style>
