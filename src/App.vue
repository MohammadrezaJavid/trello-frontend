<template>
  <p>{{ wellcomeMassage }}</p>
  
  <br>
  <br>
  <router-link to="/signup">SignUp</router-link>
  <br>
  <router-link to="/login">Login</router-link>
  <br>
  <router-link to="/logout">Logout</router-link>
  <br>
  <br>
  <router-link to="/trello/boards">Boards</router-link>
  <br>
  <router-link to="/trello/lists">Lists</router-link>
  <br>
  <router-link to="/trello/cards">Cards</router-link>
  <br>
  <br>
  <br>

  <router-link to="/trello/board">CreateBoard</router-link>
  <br>
  <router-link to="/trello/list">CreateList</router-link>
  <br>
  <router-link to="/trello/card">CreateCard</router-link>
  <br>
  <br>
  <br>

  <router-link to="/trello/delete/board">DeleteBoard</router-link>
  <br>
  <router-link to="/trello/delete/list">DeleteList</router-link>
  <br>
  <router-link to="/trello/delete/card">DeleteCard</router-link>
  <br>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: "App",
  setup() {
    const store = useStore();
    const wellcomeMassage = store.state.wellcomeMassage;

    return { wellcomeMassage };
  },
};
</script>