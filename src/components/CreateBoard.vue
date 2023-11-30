<template>
  <br>
  <hr>
  <div v-if="jwtToken">
    <h2>Create a board</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="formData.title">
      </div>
      <div>
        <label for="visibility">Visibility:</label>
        <select id="visibility" v-model="formData.visibility">
          <option value="">Select one</option>
          <option value="pu">Public</option>
          <option value="pr">Private</option>
        </select>
      </div>
      <div>
        <label>Assign users:</label>
        <div v-for="(user, index) in formUsers" :key="index">
          <input type="text" v-model="user.name">
          <button @click="removeUser(index)">Delete</button>
        </div>
        <button @click="addUser">Add User</button>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
  <div v-else>
    <p>Please log in to create a board.</p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      formData: {
        title: "",
        visibility: null
      },
      formUsers: []
    };
  },
  methods: {
    addUser() {
      this.formUsers.push({ name: "" });
    },
    removeUser(index) {
      this.formUsers.splice(index, 1);
    },
    submitForm() {
      const boardData = {
        title: this.formData.title,
        visibility: this.formData.visibility,
        users: this.formUsers.map(user => user.name)
      };

      const headers = {
        Authorization: `Bearer ${this.jwtToken}`
      };

      axios.post('http://127.0.0.1:8000/trello/boards/', boardData, { headers })
        .then(response => {
          localStorage.setItem('boardId', response.data["id"])
          console.log(response.data); 
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  computed: {
      ...mapGetters(['getJwtToken']),
      jwtToken() {
        return this.getJwtToken;
      },
    },
};
</script>
