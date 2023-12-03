<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card
      class="mx-auto"
      max-width="344"
      title="User Registration"
      color="black"
    >
      <v-container>
        <v-text-field
          v-model="form.firstname"
          color="primary"
          label="First name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="form.lastname"
          color="primary"
          label="Last name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          color="primary"
          label="Email"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="form.confirmpassword"
          color="primary"
          label="Confirm Password"
          placeholder="Enter your Confirm Password"
          variant="underlined"
        ></v-text-field>

        <v-checkbox
          v-model="form.terms"
          color="secondary"
          label="I agree to site terms and conditions"
        ></v-checkbox>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click="submitForm">
          Sign Up

          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
import axios from 'axios';
import { useNotification } from "@kyvg/vue3-notification";

export default {
  data() {
    return {
      form: {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        confirmpassword: null,
        terms: false,
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

            this.$router.push({ path: '/' });
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