<script setup>
import { useRoute } from 'vue-router';
import { onMounted, onBeforeRouteUpdate } from 'vue-router';

const route = useRoute();
onMounted(() => {
  console.log('UserProfileSub onMounted for user ID:', route.params.userId);
});

// Component-level navigation guard: onBeforeRouteUpdate
onBeforeRouteUpdate((to, from) => {
  console.log('UserProfileSub: onBeforeRouteUpdate triggered.');
  // Example: Check if data needs to be refetched if only a query param changed but component is reused.
  if (to.params.userId !== from.params.userId) {
    console.log(`UserProfileSub: User ID changed from ${from.params.userId} to ${to.params.userId}. Fetch new data if necessary.`);
    // fetchData(to.params.userId);
  }
});
</script>
<template>
  <div class="user-profile-sub">
    <h4>User Profile Subpage for {{ route.params.userId }}</h4>
    <p>Detailed profile information would go here.</p>
  </div>
</template>
<style scoped>
.user-profile-sub { padding: 10px; background-color: #efe; }
</style>
