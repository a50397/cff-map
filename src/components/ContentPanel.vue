<template>
    <div class="container" role="container">
        <header class="header" role="header">
            <h1 class="md-headline"> {{ headline }} </h1>
            <h2 class="md-body-1"> {{ subheadline}} </h2>
        </header>
        <md-card class="card" role="content">
            <md-card-content>
                <slot></slot>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
export default {
  name: "ContentPanel",
  props: {
    headline: String,
    subheadline: String
  }
};
</script>

<style scoped>

.container {
    position: relative;
    top: 7vh;
    left: 15vw;
    width: 70vw;
}

.card {
    margin-top: 7vh;
}

.header {
    color: white;
}

.header h1 {
    font-weight: bold;
    font-size: xx-large;
}

@media (max-width: 992px) {
    .container {
        left: 5vw;
        width: 90vw;
    }
}

@media (max-width: 600px) {
    .container {
        top: 5vh;
        left: 0vw;
        width: 100vw;
    }
}

</style>
