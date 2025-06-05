<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();

onMounted(() => {
  console.log('UserLayout onMounted, current params:', route.params);
});
</script>

<template>
  <div class="user-layout">
    <h3>User Section (User ID: {{ route.params.userId }})</h3>
    <nav class="user-sub-nav">
      <router-link :to="{ name: 'UserOverview', params: { userId: route.params.userId } }">Overview</router-link> |
      <router-link :to="{ name: 'UserProfileSub', params: { userId: route.params.userId } }">Profile Subpage</router-link> |
      <router-link :to="{ name: 'UserSettings', params: { userId: route.params.userId } }">Settings</router-link>
    </nav>
    <div class="user-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.user-layout {
  border: 2px solid #007bff;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
}
.user-layout h3 {
  margin-top: 0;
}
.user-sub-nav {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ccc;
}
.user-sub-nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #007bff;
}
.user-sub-nav a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
.user-content {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
}
</style>
