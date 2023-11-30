<template>
  <br>
  <hr>
    <div v-if="jwtToken">
      <h2>Delete Cards</h2>
      <ul>
        <li v-for="card in cards" :key="card.id">
          {{ card.title }}
          <button @click="deleteCard(card.id)">Delete</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Please log in to delete a card.</p>
    </div>
</template>
  
<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        cards: []
      };
    },
    created() {
      // Add jwtToken to the request headers
      const headers = {
        Authorization: `Bearer ${this.jwtToken}`
      };
  
      // Send GET request to retrieve the list of cards
      axios.get('http://127.0.0.1:8000/trello/cards/', { headers })
        .then(response => {
          this.cards = response.data;
        })
        .catch(error => {
          console.error(error); 
        });
    },
    methods: {
      deleteCard(cardId) {
        // Add jwtToken to the request headers
        const headers= {
          Authorization: `Bearer ${this.jwtToken}`
        };
  
        // Send delete request to remove the card
        axios.delete(`http://127.0.0.1:8000/trello/cards/${cardId}/`, { headers })
          .then(response => {
            console.log(response.data);

            // Remove the card from the local list
            this.cards = this.cards.filter(card => card.id !== cardId);

            alert("Delete card")
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