<template>
  <v-container>
    <v-layout>
      <h1>Signup page</h1>
    </v-layout>
    <Signup/>
  </v-container>
</template>
  
<script>
  import Signup from "../../components/base/Signup.vue";

  export default {
    components: {
      Signup
    }
  };
</script>