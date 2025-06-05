<script setup>
import { useAuthStore } from '../../stores/authStore';
const authStore = useAuthStore();
</script>
<template>
  <div class="dashboard-header">
    <h4>Dashboard Header</h4>
    <p v-if="authStore.isLoggedIn">User: {{ authStore.currentUser?.name }}</p>
    <p v-else>Not logged in</p>
  </div>
</template>
<style scoped> .dashboard-header { padding: 10px; } </style>
