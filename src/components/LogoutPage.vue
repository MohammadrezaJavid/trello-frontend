<template>
    <br>
    <hr>
    <div>
      <button @click="logout">Logout</button>
    </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
    }
  }
}
</script>