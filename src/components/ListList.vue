<template>
  <br>
  <hr>
    <div v-if="jwtToken">
      <h1>Lists!</h1>
  
      <div>
        <ul>
          <li v-for="list in lists" :key="list.id">
            <h4>title: {{ list.title }}</h4>
            <h4>created by: {{ list.creator['firstName'] }}</h4>
            <button @click="selectList(list)">Select</button>
  
            <div v-if="selectedList && selectedList.id === list.id">
              <form @submit="updateList(selectedList.id, { title: updatedTitle })">
                <input type="text" v-model="updatedTitle" placeholder="new title">
                <button type="submit">Update</button>
              </form>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Please log in to show all list.</p>
    </div>
</template>
  
<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';  
  export default {
    data() {
      return {
        lists: [],
        updatedTitle: '',
        selectedList: null,
      };
    },
    methods: {
      async getList() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/trello/lists/', {
            headers: {
              Authorization: `Bearer ${this.jwtToken}`
            }
          });
          this.lists = response.data;
        } catch (error) {
          console.log(error);
        }
      },
      selectList(list) {
        this.selectedList = list;
        this.updatedTitle = '';
      },
      updateList(listId, updatedData) {
        const headers = { Authorization: `Bearer ${this.jwtToken}` };
        const apiUrl = `http://127.0.0.1:8000/trello/lists/${listId}/`;
  
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
      this.getList();
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