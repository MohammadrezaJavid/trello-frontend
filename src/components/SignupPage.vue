<template>
  <br>
  <hr>
    <div>
      <h2>Create Account</h2>
      <form @submit.prevent="registerUser">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="user.firstName" required>
        <br>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="user.lastName" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" required>
        <br>
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="user.confirmPassword" required>
        <br>
        <button type="submit">Create Account</button>
      </form>
    </div>
</template>

<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      };
    },

    methods: {
      registerUser() {
        if (this.user.password !== this.user.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
  
        const userData = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          password: this.user.password,
          confirmPassword: this.user.confirmPassword
        };
  
        axios.post('http://127.0.0.1:8000/account/user/register/', userData)
          .then(response => {
            console.log(response.data); // Handle the response from the API

            // Reset form fields
            this.user.firstName = '';
            this.user.lastName = '';
            this.user.email = '';
            this.user.password = '';
            this.user.confirmPassword = '';
            
            // Show success message
            alert('Account created successfully');
            window.location.href = '/login';
          })
          .catch(error => {
            console.error(error); // Handle any errors that occur
            // Show error message
            alert('An error occurred while creating the account');
          });
      }
    }
  };
</script>