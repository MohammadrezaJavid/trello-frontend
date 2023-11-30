<template>
  <br>
  <hr>
    <div v-if="jwtToken">
      <h2>Create a new list</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="formData.title">
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
    <div v-else>
      <p>Please log in to create a list.</p>
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
        boardId: localStorage.getItem("boardId")
      }
    };
  },
  methods: {
    submitForm() {
      const headers= {
        Authorization: `Bearer ${this.jwtToken}`
      }

      console.log(this.formData);

      axios.post('http://127.0.0.1:8000/trello/lists/', this.formData, {headers})
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
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