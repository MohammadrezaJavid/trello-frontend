<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card :width="400">

        <v-toolbar dark color="blue">
          <v-toolbar-title>Signup</v-toolbar-title>
        </v-toolbar>
        
        <v-card-text>
          <v-form @submit="submitForm">
            <v-text-field prepend-icon="person" name="firstname" label="FirstName" id="firstname" type="text" v-model="form.firstname"></v-text-field>
            <v-text-field prepend-icon="person" name="lastname" label="LastName" id="lastname" type="text" v-model="form.lastname"></v-text-field>
            <v-text-field prepend-icon="person" name="email" label="Email" id="email" type="email" v-model="form.email"></v-text-field>
            <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="form.password"></v-text-field>
            <v-text-field prepend-icon="lock" name="confirmpassword" label="ConfirmPassword" id="confirmpassword" type="password" v-model="form.confirmpassword"></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="green" @click="submitForm">Signup</v-btn>
        </v-card-actions>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
import { useNotification } from "@kyvg/vue3-notification";

export default {
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: ''
      }
    };
  },
  methods: {
    submitForm() {
      const apiUrl = 'http://127.0.0.1:8000/account/user/register/';
      const requestData = {
        firstName: this.form.firstname,
        lastName: this.form.lastname,
        email: this.form.email,
        password: this.form.password,
        confirmPassword: this.form.confirmpassword
      };

      const { notify } = useNotification();

      axios.post(apiUrl, requestData)
        .then(response => {
          if (response.status === 201) {
            notify({
              title: "Registerd",
              text: "Your Account is created!",
              speed: 500,
            });

            // window.location.href = '/';
          }
        })
        .catch(error => {
          // console.log(error.response.data.password[0]);
          console.error(error);
        });
    }
  }
};
</script>


















<!-- <template>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card :width="400">

          <v-toolbar dark color="blue">
            <v-toolbar-title>Signup</v-toolbar-title>
          </v-toolbar>
          
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" name="firstname" label="FirstName" id="firstname" type="text"></v-text-field>
              <v-text-field prepend-icon="person" name="lastname" label="LastName" id="lastname" type="text"></v-text-field>
              <v-text-field prepend-icon="person" name="email" label="Email" id="email" type="email"></v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
              <v-text-field prepend-icon="lock" name="confirmpassword" label="ConfirmPassword" id="confirmpassword" type="password"></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="green">Signup</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
</template> -->

