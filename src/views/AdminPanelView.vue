<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

onMounted(() => {
  console.log('AdminPanelView onMounted.');
});
</script>
<template>
  <div class="admin-panel-view">
    <h1>Admin Panel</h1>
    <p v-if="authStore.isLoggedIn && authStore.currentUser">
      Welcome, {{ authStore.currentUser.name }}! You have access to the admin panel.
    </p>
    <p>Your roles: {{ authStore.currentUser?.roles?.join(', ') }}</p>
    <p>This page is protected by `requiresAuth` and `roles` meta fields in the router.</p>
    <!-- Admin specific content would go here -->
  </div>
</template>
<style scoped>
.admin-panel-view { padding: 1rem; background-color: #f0e6ff; border-radius: 5px; }
</style>
