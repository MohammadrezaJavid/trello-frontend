<template>
    <v-container>
      <v-layout>
        <h1 class="display-1">About Page</h1>
      </v-layout>
      <About/>
    </v-container>
</template>

<script>
  import About from "../../components/base/About.vue";

  export default {
    components: {
      About
    }
  };
</script>