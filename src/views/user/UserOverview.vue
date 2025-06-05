<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
onMounted(() => {
  console.log('UserOverview onMounted for user ID:', route.params.userId);
});
</script>
<template>
  <div class="user-overview">
    <h4>User Overview for {{ route.params.userId }}</h4>
    <p>This is the default overview page for the user.</p>
    <p>Here you might see a summary of user activity or quick links.</p>
  </div>
</template>
<style scoped>
.user-overview { padding: 10px; background-color: #eef; }
</style>
