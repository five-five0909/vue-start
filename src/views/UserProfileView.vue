<script setup>
import { ref, computed, watch, onMounted, onUnmounted, onUpdated } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  id: { // Received via props: true in router config
    type: String,
    required: true
  }
});

const route = useRoute();
const userProfile = ref(null);
const loading = ref(false);

// Mock user data - in a real app, this would come from a store or API
const mockUsers = {
  '1': { name: 'Alice Wonderland', bio: 'Curiouser and curiouser!', email: 'alice@example.com' },
  '2': { name: 'Bob The Builder', bio: 'Can we fix it? Yes, we can!', email: 'bob@example.com' },
  'user123': { name: 'Test User (from store)', bio: 'Logged in user profile', email: 'user@example.com' },
  'admin456': { name: 'Admin User (from store)', bio: 'Powerful admin profile', email: 'admin@example.com' }
};

const fetchUserProfile = (userId) => {
  console.log(`UserProfileView: Fetching profile for user ID (props): ${props.id}, (route.params): ${route.params.id}, effective: ${userId}`);
  loading.value = true;
  userProfile.value = null;
  setTimeout(() => {
    userProfile.value = mockUsers[userId] || { name: 'User Not Found', bio: `No profile available for ID ${userId}.`, email:'' };
    loading.value = false;
    console.log('UserProfileView: Profile data loaded:', userProfile.value);
  }, 500);
};

// Computed property example
const userDisplayName = computed(() => {
  return userProfile.value ? userProfile.value.name.toUpperCase() : 'N/A';
});

// Watch for changes in props.id to refetch data
watch(() => props.id, (newId, oldId) => {
  console.log(`UserProfileView: Watched props.id changed from ${oldId} to ${newId}`);
  if (newId) {
    fetchUserProfile(newId);
  }
}, { immediate: true }); // immediate: true to run on component creation as well

// Lifecycle hooks
onMounted(() => {
  console.log('UserProfileView onMounted. Initial user ID from props:', props.id);
  // fetchUserProfile(props.id); // Covered by watch immediate:true
});

onUnmounted(() => {
  console.log('UserProfileView onUnmounted.');
});

onUpdated(() => {
  console.log('UserProfileView onUpdated. Current user ID from props:', props.id);
});
</script>

<template>
  <div class="user-profile-view">
    <h2>User Profile</h2>
    <div v-if="loading">Loading profile...</div>
    <div v-else-if="userProfile">
      <p><strong>User ID (from prop):</strong> {{ props.id }}</p>
      <p><strong>User ID (from route.params):</strong> {{ route.params.id }}</p>
      <h3>{{ userDisplayName }}</h3>
      <p><strong>Bio:</strong> {{ userProfile.bio }}</p>
      <p><strong>Email:</strong> {{ userProfile.email }}</p>
    </div>
    <div v-else>
      <p>Could not load user profile.</p>
    </div>
    <p>
      <router-link :to="{ name: 'UserProfile', params: { id: '1' } }">View Alice</router-link> |
      <router-link :to="{ name: 'UserProfile', params: { id: '2' } }">View Bob</router-link>
    </p>
  </div>
</template>

<style scoped>
.user-profile-view {
  padding: 1rem;
  border: 1px solid #bada55;
  border-radius: 5px;
}
</style>
