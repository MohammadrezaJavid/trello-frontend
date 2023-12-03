<template>
    <v-item-group selected-class="bg-primary">
      <v-container>
        <v-row>

          <v-col v-for="board in boards" :key="board.id" cols="12" md="3">
            <v-item v-slot="{selectedClass}">
              <v-card
                :class="['d-flex align-center', selectedClass]"
                dark
                height="200"
                @click="boardClicked(board.id)"
                color="light-blue-darken-3">
                <v-card-text class="text-h6 flex-grow-1 text-center">
                  {{ board.title }}
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
          
          <component :is="CreateBoard"></component>
        </v-row>
      </v-container>
    </v-item-group>
</template>

<script>
import axios from 'axios';
import CreateBoard from '@/components/CreateBoard.vue';

export default {
    components: {
        CreateBoard
    },
    data() {
        return {
            CreateBoard: 'CreateBoard',
            boards: []
        };
    },
    methods: {
        async getBoards() {
            try {
              const response = await axios.get('http://127.0.0.1:8000/trello/boards/', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
              });
              this.boards = response.data;
            } catch (error) {
              console.log(error);
            }
        },
        boardClicked (boardId) {
            // this.$router.push({ path: '/', query: { id: boardId } });
            this.$router.push({path: '/'});
        },
    },
    created() {
        this.getBoards();
    },
}
</script>