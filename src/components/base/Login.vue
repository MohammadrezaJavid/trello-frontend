<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" color="black" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="/signup"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import axios from 'axios';
import { useNotification } from "@kyvg/vue3-notification";

export default {
  data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
  }),

  methods: {
    onSubmit () {
        if (!this.form) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
        this.login();
    },

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

            this.$router.push({path: '/board'});
          }
        })
        .catch(error => {
          notify({
              title: "Unauthorized",
              text: "Email or Password is not true!",
              speed: 500,
            });
          console.error(error);
        });
      },
    },
  };
</script>