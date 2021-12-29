<template>
  <div class="login">
    <login-form></login-form>
  </div>
</template>

<script>

import LoginForm from "../components/login/LoginForm.vue";

export default {
  name: 'Login',
  components: {
    LoginForm,
  }
}
</script>

<style scoped>
.login{
  height: 100vh;
  background: url("../assets/image/miko.jpg") center no-repeat;
}
</style>
