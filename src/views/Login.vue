<template>
  <div>
    <login-form></login-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import LoginForm from "../components/login/LoginForm.vue";

@Component({
  components: {
    LoginForm,
  },
})
export default class Login extends Vue {}
</script>

<style scoped></style>
