<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const username = ref('');
const password = ref('');
const errorMessage = ref('');

async function handleLogin() {
  errorMessage.value = '';
  try {
    await authStore.login({ username: username.value, password: password.value });
    // Redirection is handled within authStore.login based on redirectAfterLogin or default
    // If no redirect query param was set by guard, authStore redirects to '/'
    // const redirectPath = route.query.redirect || '/';
    // router.push(redirectPath);
  } catch (error) {
    errorMessage.value = error.message || 'Failed to login.';
    console.error('LoginView: Login failed', error);
  }
}
</script>

<template>
  <div class="login-view">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit">Login</button>
    </form>
    <p>Hint: Try user/password or admin/password.</p>
  </div>
</template>

<style scoped>
.login-view {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.login-view div {
  margin-bottom: 1rem;
}
.login-view label {
  display: block;
  margin-bottom: 0.5rem;
}
.login-view input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
.error-message {
  color: red;
  margin-bottom: 1rem;
}
</style>
