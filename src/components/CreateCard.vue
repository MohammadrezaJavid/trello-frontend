<template>
  <br>
  <hr>
  <div v-if="jwtToken">
    <h2>Create Card</h2>
    <form @submit.prevent="submitForm">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="card.title" required>
      <br>
      <label for="description">Description:</label>
      <input type="text" id="description" v-model="card.description" required>
      <br>
      <label for="tag">Tag:</label>
      <input type="text" id="tag" v-model="card.tag" required>
      <br>
      <label for="listId">List ID:</label>
      <input type="number" id="listId" v-model="card.listId" required>
      <br>
      <div>
          <label>Assign Users:</label>
          <div v-for="(user, index) in card.assignUsers" :key="index">
            <input type="text" v-model="card.assignUsers[index]">
            <button @click="removeUser(index)">Delete</button>
          </div>
          <button @click="addUser">Add User</button>
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
  <div v-else>
    <p>Please log in to create a card.</p>
  </div>
</template>


<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      card: {
        title: '',
        description: '',
        tag: '',
        listId: null,
        assignUsers: []
      }
    };
  },
  methods: {
    addUser() {
      this.card.assignUsers.push("");
    },
    removeUser(index) {
      this.card.assignUsers.splice(index, 1);
    },
    submitForm() {
      const headers =  {
        Authorization: `Bearer ${this.jwtToken}`
      };

      axios.post('http://127.0.0.1:8000/trello/cards/', this.card, {headers})
        .then(response => {
          // Handle successful response
          console.log(response.data);
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    }
  },
  computed: {
      ...mapGetters(['getJwtToken']),
      jwtToken() {
        return this.getJwtToken;
      },
    },
};
</script>