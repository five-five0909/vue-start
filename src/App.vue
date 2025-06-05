<script setup>
import { onMounted, onUnmounted, onUpdated, computed } from 'vue';
import { useAuthStore } from './stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isLoggedIn = computed(() => authStore.isLoggedIn);
const currentUser = computed(() => authStore.currentUser);

function handleLogout() {
  console.log('App.vue: handleLogout called');
  authStore.logout();
  // The store's logout action already redirects to /login
}

// Programmatic navigation examples
function goToAbout() {
  router.push({ name: 'About' });
}

function goBack() {
  router.go(-1); // Go back one step in history
}

// Lifecycle Hooks Demo
onMounted(() => {
  console.log('App.vue onMounted: Root component has been mounted.');
  // Attempt to fetch user if there might be a persisted session (simulated)
  // authStore.fetchUser(); // This can be called here if we want to check auth on app load
});

onUnmounted(() => {
  console.log('App.vue onUnmounted: Root component is about to be unmounted.');
});

onUpdated(() => {
  console.log('App.vue onUpdated: Root component has been updated.');
});
</script>

<template>
  <div id="app-container">
    <header class="app-header">
      <div class="logo">Vue 3 Demo</div>
      <nav class="main-nav">
        <router-link to="/">Home</router-link>
        <router-link :to="{ name: 'About' }">About</router-link>
        <router-link v-if="isLoggedIn" :to="{ name: 'UserProfile', params: { id: currentUser.id } }">My Profile</router-link>
        <router-link v-if="isLoggedIn" :to="{ name: 'UserOverview', params: { userId: currentUser.id } }">User Section</router-link>
        <router-link v-if="isLoggedIn && currentUser?.roles?.includes('admin')" :to="{ name: 'AdminPanel' }">Admin Panel</router-link>
        <router-link :to="{ name: 'Dashboard' }">Dashboard (Named Views)</router-link>
        <router-link :to="{ name: 'SuspenseDemo' }">Suspense Demo</router-link>
        <router-link to="/non-existent-page">Test 404</router-link>
      </nav>
      <div class="auth-section">
        <template v-if="isLoggedIn && currentUser">
          <span>Welcome, {{ currentUser.name }}!</span>
          <button @click="handleLogout" class="auth-button">Logout</button>
        </template>
        <template v-else>
          <router-link :to="{ name: 'Login' }" class="auth-button">Login</router-link>
        </template>
      </div>
    </header>

    <main class="app-main">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <footer class="app-footer">
      <p>&copy; 2023 Vue Demo App. All rights reserved.</p>
      <div class="nav-programmatic">
        <button @click="goToAbout">Go to About (Programmatic)</button>
        <button @click="goBack">Go Back (router.go)</button>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global styles (can also be in src/assets/main.css) */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  background-color: #f4f4f4;
  color: #333;
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #34495e;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
}

.main-nav a {
  margin: 0 12px;
  text-decoration: none;
  color: #ecf0f1;
  padding: 5px 0;
  transition: color 0.3s ease;
}

.main-nav a:hover {
  color: #42b983; /* Vue green for hover */
}

/* Styles for active router links */
.main-nav a.router-link-active,
.main-nav a.router-link-exact-active {
  color: #42b983; /* Vue green */
  font-weight: bold;
  border-bottom: 2px solid #42b983;
}

.auth-section {
  display: flex;
  align-items: center;
}

.auth-section span {
  margin-right: 1rem;
}

.auth-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none; /* For router-link styled as button */
  font-size: 0.9em;
}

.auth-button:hover {
  background-color: #36a476;
}

.app-main {
  flex-grow: 1;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.app-footer {
  text-align: center;
  padding: 1.5rem;
  background-color: #2c3e50;
  color: #ecf0f1;
  font-size: 0.9em;
}
.nav-programmatic button{
  margin: 5px;
}

/* Basic transition for router-view */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
