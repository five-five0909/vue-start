<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
});

const userProfile = ref(null);

// Mock user data
const mockAsyncUsers = {
  'suspenseUser1': { name: 'Suspense Alice', details: 'Loaded asynchronously with success.' },
  'suspenseUser2': { name: 'Suspense Bob', details: 'Another user loaded with success.' },
};

console.log(`AsyncUserProfile setup started for userId: ${props.userId}`);

// Simulate an asynchronous operation
const fetchData = async () => {
  console.log(`AsyncUserProfile: Simulating fetch for userId: ${props.userId}`);
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

  if (props.userId === 'errorUser') {
    console.error(`AsyncUserProfile: Simulating error for userId: ${props.userId}`);
    throw new Error(`Failed to fetch profile for ${props.userId}. This is a simulated error.`);
  }

  const data = mockAsyncUsers[props.userId];
  if (!data) {
     console.warn(`AsyncUserProfile: No data for userId: ${props.userId}, returning generic profile.`);
     userProfile.value = { name: 'Unknown User', details: 'Profile not found for this ID.' };
  } else {
    userProfile.value = data;
  }
  console.log(`AsyncUserProfile: Data fetched for ${props.userId}`, userProfile.value);
};

// `await` at the top level of <script setup> makes this component async
// and thus usable with <Suspense>
await fetchData();

console.log(`AsyncUserProfile setup completed for userId: ${props.userId}`);
</script>

<template>
  <div class="async-user-profile">
    <h3>Async User Profile (for Suspense)</h3>
    <div v-if="userProfile">
      <p><strong>User ID:</strong> {{ props.userId }}</p>
      <p><strong>Name:</strong> {{ userProfile.name }}</p>
      <p><strong>Details:</strong> {{ userProfile.details }}</p>
    </div>
    <div v-else>
      <p>User profile not available.</p>
    </div>
  </div>
</template>

<style scoped>
.async-user-profile {
  padding: 1rem;
  background-color: #e0f7fa;
  border: 1px solid #00acc1;
  border-radius: 4px;
  margin-top: 1rem;
}
</style>
