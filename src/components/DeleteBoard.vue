<template>
  <br>
  <hr>
    <div v-if="jwtToken">
      <h2>Delete Boards</h2>
      <ul>
        <li v-for="board in boards" :key="board.id">
          {{ board.title }}
          <button @click="deleteBoard(board.id)">Delete</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Please log in to delete a board.</p>
    </div>
</template>
  

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        boards: []
      };
    },
    created() {
      // Add jwtToken to the request headers
      const headers = {
        Authorization: `Bearer ${this.jwtToken}`
      };
  
      // Send GET request to retrieve the board of boards
      axios.get('http://127.0.0.1:8000/trello/boards/', { headers })
        .then(response => {
          this.boards = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    methods: {
      deleteBoard(boardId) {
        // Add jwtToken to the request headers
        const headers= {
          Authorization: `Bearer ${this.jwtToken}`
        };

        // Send delete request to remove the board
        axios.delete(`http://127.0.0.1:8000/trello/boards/${boardId}/`, { headers })
          .then(response => {
            console.log(response.data);
            // Remove the board from the local board
            this.boards = this.boards.filter(board => board.id !== boardId);
            alert("Delete Board")
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