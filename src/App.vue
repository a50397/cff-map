/* 
Main application
*/

<template>
  <main id="app" role="main">
    <content-panel :headline="headline" :subheadline="subheadline">
      <template>
        <stations-map></stations-map>
      </template>
      <template>
        <attribution-bar></attribution-bar>
      </template>
      <template>
        <stations-list></stations-list>
      </template>
    </content-panel>
  </main>
</template>

<script>
import StationsMap from "@/components/StationsMap";
import ContentPanel from "@/components/ContentPanel";
import AttributionBar from "@/components/AttributionBar";
import StationsList from "@/components/StationsList";

export default {
  name: "app",
  data() {
    return {
      headline: "Explore swiss railway stations",
      subheadline:
        "An interactive map that let you explore the dense network of railway stations in Switzerland."
    };
  },
  components: {
    ContentPanel,
    StationsMap,
    AttributionBar,
    StationsList
  },
  created() {
    this.$store.dispatch("loadStations")
  },
  mounted() {
    // TODO: get user location and store it the store
  }
};
</script>

<style>

#app {
  text-align: center;
  background: linear-gradient(
    180deg,
    red calc(0.6 * 100vh),
    white calc(0.4 * 100vh)
  );
}

#app::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  z-index: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("https://i.ibb.co/B64S7ND/header-background.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 50vh;
  width: 100vw;
  height: 50vh;
}

</style>
