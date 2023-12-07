<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        width="1024">
        
        <template v-slot:activator="{ props }">
            <v-card :class="['d-flex align-center', selectedClass]" height="200" v-bind="props">
                <v-card-text class="text-h6 flex-grow-1 text-center">
                    Create new board
                </v-card-text>                    
            </v-card>
        </template>

        <v-card>
          <v-card-title>
            <span class="text-h5">Create Borad</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>

                <!-- title of board -->
                <v-col
                  cols="12"
                  sm="6"
                  md="4">
                  <v-text-field
                    label="Title of Board*"
                    required
                    v-model="formData.title">
                  </v-text-field>
                </v-col>

                <!-- Visibility -->
                <v-col
                  cols="12"
                  sm="6">
                  <v-select
                    :items="['public', 'private']"
                    label="Visibility*"
                    required
                    v-model="formData.visibility">
                  </v-select>
                </v-col>

                <!-- Assign users -->
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="users.map(user => user.email)"
                    label="Assign users"
                    multiple>
                  </v-autocomplete>
                </v-col>

              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- close btn -->
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Close
            </v-btn>

            <!-- save btn -->
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="handelSave">
              Save
            </v-btn>
          </v-card-actions>
        
        </v-card>

      </v-dialog>
    </v-row>
</template>

<script>
  import axios from 'axios';

  const API_URL_USER_LIST = 'http://localhost:8000/account/users/';
  const API_URL_BOARD_LIST = 'http://127.0.0.1:8000/trello/boards/';

  
  export default {
    data: () => ({
      dialog: false,
      users: [],
      formData: {
        title: null,
        visibility: null
      }
    }),
    methods: {
      fetchUsers() {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        };
        axios.get(API_URL_USER_LIST, { headers })
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      setVisibility() {
        if(this.formData.visibility === "public") {
          this.formData.visibility = "pu";
        } else if(this.formData.visibility === "private") {
          this.formData.visibility = "pr";
        } else {
          this.formData.visibility = "invalid";
        }
      },
      submitForm() {
        this.setVisibility();

        const boardData = {
          title: this.formData.title,
          visibility: this.formData.visibility,
          users: this.users.map(user => user.name)
        };

        const headers = {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        };
        
        console.log(boardData);

        // axios.post(API_URL_BOARD_LIST, boardData, { headers })
        //   .then(response => {
        //     console.log(response.data);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });
          
        
      },
      handelSave() {
        this.dialog = false;
        this.submitForm();
      },
    },
    created() {
      this.fetchUsers();
    }
  }
</script>