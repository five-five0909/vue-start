<script setup>
import { onErrorCaptured, ref } from 'vue';
import AsyncUserProfile from './AsyncUserProfile.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const userIdToLoad = ref('suspenseUser1');
const keyForAsync = ref(0); // Used to force re-render of AsyncUserProfile

// Error handling for Suspense
const error = ref(null);
onErrorCaptured((err, instance, info) => {
  console.error('SuspenseDemoView: Error captured in Suspense boundary:', err, info);
  error.value = err;
  return false; // Prevents the error from propagating further
});

function loadUser(id) {
  userIdToLoad.value = id;
  error.value = null; // Reset error
  keyForAsync.value++; // Change key to force AsyncUserProfile to remount and re-trigger suspense
  console.log(`SuspenseDemoView: Attempting to load user: ${id} with key: ${keyForAsync.value}`);
}
</script>

<template>
  <div class="suspense-demo-view">
    <h2>Suspense Demo</h2>
    <p>
      This view demonstrates using <code>&lt;Suspense&gt;</code> to handle asynchronous components.
    </p>
    <button @click="loadUser('suspenseUser1')">Load User 1 (Success)</button>
    <button @click="loadUser('suspenseUser2')">Load User 2 (Success)</button>
    <button @click="loadUser('errorUser')">Load User (Simulate Error)</button>

    <div v-if="error" class="error-message">
      <p><strong>Oops! Something went wrong while loading the user profile:</strong></p>
      <p>{{ error.message }}</p>
    </div>

    <Suspense v-else :key="keyForAsync">
      <template #default>
        <!-- The component that might be async -->
        <AsyncUserProfile :userId="userIdToLoad" />
      </template>
      <template #fallback>
        <!-- What to show while waiting for the default slot to resolve -->
        <LoadingSpinner />
        <p>Loading user profile via Suspense fallback...</p>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.suspense-demo-view {
  padding: 1rem;
  border: 1px solid #ffc107;
  border-radius: 5px;
}
.suspense-demo-view button {
  margin-right: 10px;
  margin-bottom: 10px;
}
.error-message {
  color: red;
  background-color: #ffebee;
  border: 1px solid red;
  padding: 10px;
  margin-top: 10px;
}
</style>
