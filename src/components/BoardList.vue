<template>
  <br>
  <hr>
    <div v-if="jwtToken">
      <h1>Boards!</h1>
  
      <div>
        <ul>
          <li v-for="board in boards" :key="board.id">
            <h4>created by: {{ board.creator['firstName'] }}</h4>
            <h4>title: {{ board.title }}</h4>
            <h4>visibility: {{ visibilityBoard(board.visibility) }}</h4>
            <button @click="selectBoard(board)">Select</button>
            
            <template v-if="selectedBoard && selectedBoard.id === board.id">
              <div>
                <form @submit="updateBoard(selectedBoard.id, { title: updatedTitle, visibility: updatedVisibility })">
                  <input type="text" v-model="updatedTitle" placeholder="new title">
                  <select v-model="updatedVisibility">
                    <option value="pu">public</option>
                    <option value="pr">private</option>
                  </select>
                  <button type="submit">Update</button>
                </form>
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Please log in to show boards.</p>
    </div>
</template>
  
<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        boards: [],
        updatedVisibility: '',
        updatedTitle: '',
        selectedBoard: null,
      };
    },
    methods: {
      async getBoard() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/trello/boards/', {
            headers: {
              Authorization: `Bearer ${this.jwtToken}`
            }
          });
          this.boards = response.data;
        } catch (error) {
          console.log(error);
        }
      },
      visibilityBoard(visibility) {
        if (visibility === 'pu') {
          return 'public';
        } else if (visibility === 'pr') {
          return 'private';
        } else {
          return 'invalid';
        }
      },
      selectBoard(board) {
        this.selectedBoard = board;
        this.updatedTitle = '';
        this.updatedVisibility = '';
      },
      updateBoard(boardId, updatedData) {
        const headers = { Authorization: `Bearer ${this.jwtToken}` };
        const apiUrl = `http://127.0.0.1:8000/trello/boards/${boardId}/`;
  
        axios
          .patch(apiUrl, updatedData, { headers })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
    created() {
      this.getBoard();
    },
    computed: {
      ...mapGetters(['getJwtToken']),
      jwtToken() {
        return this.getJwtToken;
      },
    },
  };
</script>
  
<style scoped></style>