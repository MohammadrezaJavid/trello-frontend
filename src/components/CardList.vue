<template>
  <br>
  <hr>
    <div v-if="jwtToken">
      <h1>Cards!</h1>
  
      <div>
        <ul>
          <li v-for="card in cards" :key="card.id">
            <h4>title: {{ card.title }}</h4>
            <h4>description: {{ card.description }}</h4>
            <h4>tag: {{ card.tag }}</h4>
            <h4>creator: {{ card.creator['firstName'] }}</h4>
            
            <h4>assignUser:</h4>
            <div>
              <div v-for="assignUser in card.assignUsers" :key="assignUser.id" class="comment-box">
                <p>{{ assignUser }}</p>
              </div>
            </div>
            <hr>

            <h4>comments: </h4>
            <div>
              <div v-for="comment in card.comments" :key="comment.id" class="comment-box">
                <p>{{ comment['text'] }}, writer is: {{ comment['writer']['firstName'] }}</p>
              </div>
            </div>

            <form @submit.prevent="addComment(card.id)">
              <input type="text" v-model="commentText" required>
              <button type="submit">Add Comment</button>
            </form>
  
            <button @click="selectCard(card)">Select</button>
  
            <div v-if="selectedCard && selectedCard.id === card.id">
                <br>
              <form @submit.prevent="updateCard(selectedCard.id)">
    
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="updatedTitle" placeholder="new title">
                <br>

                <label for="description">Description:</label>
                <input type="text" id="description" v-model="updatedDescription" placeholder="new description">
                <br>

                <label for="tag">Tag:</label>
                <input type="text" id="tag" v-model="updatedTag" placeholder="new tag">
                <br>

                <label for="assignuser">AssignUser:</label>
                <select id="assignuser" v-model="updatedAssignUser">
                  <option value="">Select user</option>
                  <option v-for="user in users" :value="user.id" :key="user.id">{{ user.email }}</option>
                </select>

                <button type="submit">Update</button>
              </form>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Please log in to show card list.</p>
    </div>
</template>
  

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        cards: [],
        updatedTitle: '',
        updatedDescription: '',
        updatedTag: '',
        updatedAssignUser: '',
        selectedCard: null,
        commentText: '',
        users: [],
      };
    },
    methods: {
      async getCard() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/trello/cards/', {
            headers: {
              Authorization: `Bearer ${this.jwtToken}`
            }
          });
          this.cards = response.data;
        } catch (error) {
          console.log(error);
        }
      },
      selectCard(card) {
        this.selectedCard = card;
        this.updatedTitle = card.title;
        this.updatedDescription = card.description;
        this.updatedTag = card.tag;
        this.updatedAssignUser = '';
      },
      updateCard(cardId) {
        const headers = { Authorization: `Bearer ${this.jwtToken}` };
        const apiUrl = `http://127.0.0.1:8000/trello/cards/${cardId}/`;
  
        const updatedData = {
          title: this.updatedTitle,
          description: this.updatedDescription,
          tag: this.updatedTag,
          assignUser: this.updatedAssignUser
        };
  
        axios
          .patch(apiUrl, updatedData, { headers })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      },
      async addComment(cardId) {
        const commentData = {
          cardId: cardId,
          text: this.commentText
        };
  
        try {
          const headers = {
            Authorization: `Bearer ${this.jwtToken}`
          };
          const response = awaitaxios.post('http://localhost:8000/trello/cards/comment/', commentData, { headers });
          const newComment = response.data;
  
          localStorage.setItem('comment', newComment['text']);
  
          location.reload();
  
          this.commentText = '';
        } catch (error) {
          console.log(error);
          alert('An error occurred while adding the comment');
        }
      },
      async getUsers() {
        const headers = {
          Authorization: `Bearer ${this.jwtToken}`
        };

        try {
          const response = await axios.get('http://localhost:8000/account/users/', {headers});
          this.users = response.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    created() {
      this.getCard();
      this.getUsers();
    },
    computed: {
      ...mapGetters(['getJwtToken']),
      jwtToken() {
        return this.getJwtToken;
      },
    },
  };
</script>
  
<style scoped>
  .comment-box {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>