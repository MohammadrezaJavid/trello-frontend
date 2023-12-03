<template>
  <v-container>
    <v-layout>
      <h1>Home page</h1>
    </v-layout>
    <Login/>
  </v-container>
</template>

<script>
  import Login from "../../components/base/Login.vue";

  export default {
    components: {
      Login
    }
  };
</script>