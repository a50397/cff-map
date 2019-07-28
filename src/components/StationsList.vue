/* 
List of stations 
*/

<template>
  <div role="list">
    <md-progress-spinner v-if="stations.length === 0" :md-stroke="3" md-mode="indeterminate">
    </md-progress-spinner>
    <md-list class="md-triple-line station-list">
      <stations-list-item
        v-for="(station, index) in stations" 
        :station="station" 
        :index="index"
        :key="index">
      </stations-list-item>
    </md-list>
  </div>
</template>

<script>
import StationsListItem from "@/components/StationsListItem"
import { mapState } from 'vuex'

export default {
  name: "StationsList",
  components: {
    StationsListItem
  },
  computed: {
    ...mapState(['stations'])
  }
};
</script>

<style scoped>

.station-list {
  max-height: 80vh;
  overflow: auto;
}

</style>
