<template>
  <div class="attribution" role="banner">
    <span>
      {{ text }}
      <a title="SBB.ch" class="logo">
        <img
          width="150px"
          src="https://s3-eu-west-1.amazonaws.com/aws-ec2-eu-1-opendatasoft-staticfileset/sbb/logo"
          class="logo"
          alt="SBB LOGO"
        >
      </a>
    </span>
  </div>
</template>

<script>
export default {
  name: "AttributionBar",
  data() {
    return {
      text: "Based on data from the "
    };
  }
};
</script>

<style scoped>

.attribution {
  text-align: right;
  padding: 20px 5px 20px;
}

.logo {
  margin-top: -7px;
  margin-left: 5px;
}

</style>


