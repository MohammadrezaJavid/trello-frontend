<template>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card :width="400">

          <v-toolbar dark color="blue">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" name="email" label="Email" id="email" type="email" v-model="email"></v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password"></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="green" @click="login">Login</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';
import { useNotification } from "@kyvg/vue3-notification";

export default {
  methods: {
    login() {
      const url = 'http://127.0.0.1:8000/account/login/';
      const data = {
        email: this.email,
        password: this.password,
      };
      
      const { notify } = useNotification();

      axios.post(url, data)
        .then(response => {
          if (response.status === 200){
            notify({
              title: "Authorization",
              text: "You have been logged in!",
              speed: 500,
            });

            localStorage.setItem('jwtToken', response.data['access']);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

<!-- 
<script>
  import { mapMutations, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        email: '',
        password: '',
        error: ''
      };
    },
    methods: {
      ...mapMutations(['setJwtToken']),

      async login() {

        try {
          const response = await fetch('http://127.0.0.1:8000/account/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password
            })
          });
  
          if (response.ok) {
            this.error = '';
            
            const responseBody = await response.json();
            const accessToken = responseBody.access;

            
            this.setJwtToken(accessToken);
          } else {
            // Failed login
            const errorData = await response.json();
            this.error = errorData.detail;
          }
        } catch (error) {
          console.error('Login error:', error);
          this.error = 'An error occurred during login.';
        }
      }
    },
    computed: {
      ...mapGetters(['getJwtToken']),
      jwtToken() {
        return this.getJwtToken;
      },
    },
  };
</script> -->
