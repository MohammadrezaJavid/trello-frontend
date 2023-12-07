<template>
  <v-app>
    <notifications />

    <nav>
      <v-toolbar app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-title class="headline text-uppercase">Trello web app</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="/" exact>Home</v-btn>
          <v-btn flat to="/signup" exact>Signup</v-btn>
          <v-btn flat to="/signout" exact>Signout</v-btn>
          <v-btn flat to="/about">About</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-navigation-drawer app v-model="drawer" right>
        <v-list-item title="Trello web app" subtitle="Menu"></v-list-item>
        <v-divider></v-divider>

        <v-list-item link @click="$router.push({ path: '/' })" title="Home"></v-list-item>
        <v-list-item link @click="$router.push({ path: '/signup' })" title="Signup"></v-list-item>
        <v-list-item link @click="$router.push({ path: '/signout' })" title="Signout"></v-list-item>
        <v-list-item link @click="$router.push({ path: '/about' })" title="About"></v-list-item>
      </v-navigation-drawer>
    </nav>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        drawer: false
      };
    }
  };
</script>