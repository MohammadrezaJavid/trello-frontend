<template>
  <br>
  <hr>
    <div v-if="jwtToken">
      <h2>Delete Lists</h2>
      <ul>
        <li v-for="list in lists" :key="list.id">
          {{ list.title }}
          <button @click="deleteList(list.id)">Delete</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Please log in to delete a list.</p>
    </div>
</template>
  

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        lists: []
      };
    },
    created() {
      // Add jwtToken to the request headers
      const headers = {
        Authorization: `Bearer ${this.jwtToken}`
      };
  
      // Send GET request to retrieve the list of lists
      axios.get('http://127.0.0.1:8000/trello/lists/', { headers })
        .then(response => {
          this.lists = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    methods: {
      deleteList(listId) {
        // Add jwtToken to the request headers
        const headers= {
          Authorization: `Bearer ${this.jwtToken}`
        };
  
        // Send delete request to remove the list
        axios.delete(`http://127.0.0.1:8000/trello/lists/${listId}/`, { headers })
          .then(response => {
            console.log(response.data);
            // Remove the list from the local list
            this.lists = this.lists.filter(list => list.id !== listId);

            alert("Delete list")
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