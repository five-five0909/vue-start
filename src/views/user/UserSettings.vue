<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { onBeforeRouteLeave } from 'vue-router'; // Correct import
import { onMounted } from 'vue';

const route = useRoute();
const settingsData = ref({ preference1: 'Default A', preference2: true });
const hasUnsavedChanges = ref(false);

onMounted(() => {
  console.log('UserSettings onMounted for user ID:', route.params.userId);
  // Load settings for route.params.userId here
});

function onDataChange() {
  hasUnsavedChanges.value = true;
  console.log('UserSettings: Data changed, hasUnsavedChanges is true.');
}

function saveChanges() {
  console.log('UserSettings: Saving changes...', settingsData.value);
  // Simulate save
  setTimeout(() => {
    hasUnsavedChanges.value = false;
    alert('Settings saved!');
  }, 500);
}

// Component-level navigation guard: onBeforeRouteLeave
onBeforeRouteLeave((to, from) => {
  console.log('UserSettings: onBeforeRouteLeave triggered.');
  if (hasUnsavedChanges.value) {
    const answer = window.confirm('You have unsaved changes! Are you sure you want to leave?');
    if (!answer) {
      console.log('UserSettings: Navigation cancelled by user.');
      return false; // Prevent navigation
    }
  }
  console.log('UserSettings: Allowed to navigate away.');
  return true; // Allow navigation
});
</script>
<template>
  <div class="user-settings">
    <h4>User Settings for {{ route.params.userId }}</h4>
    <form @input="onDataChange">
      <div>
        <label for="pref1">Preference 1:</label>
        <input type="text" id="pref1" v-model="settingsData.preference1">
      </div>
      <div>
        <label for="pref2">Preference 2 (Enable Feature):</label>
        <input type="checkbox" id="pref2" v-model="settingsData.preference2">
      </div>
    </form>
    <p v-if="hasUnsavedChanges" style="color: orange;">You have unsaved changes.</p>
    <button @click="saveChanges">Save Settings</button>
  </div>
</template>
<style scoped>
.user-settings { padding: 10px; background-color: #fee; }
.user-settings div { margin-bottom: 10px; }
</style>
