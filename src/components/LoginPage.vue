<template>
  <br>
  <hr>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" required placeholder="enter email">
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required placeholder="enter password">
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>
  
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

            console.log(this.jwtToken);
            localStorage.setItem('tok', this.jwtToken);
            
            location.reload(true);
            // Successful login
            
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
</script>
  
<style scoped>
  .error {
    color: red;
    margin-top: 10px;
  }
</style>