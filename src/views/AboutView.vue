<script setup>
import { onMounted, watchEffect, ref } from 'vue';

const message = ref('This is the about page.');
const dynamicContent = ref('');
const reactiveSource1 = ref(10);
const reactiveSource2 = ref('Hello');

onMounted(() => {
  console.log('AboutView onMounted hook called.');
});

// watchEffect demo
watchEffect(() => {
  // This effect will run immediately and then re-run whenever
  // reactiveSource1.value or reactiveSource2.value changes.
  dynamicContent.value = `WatchEffect Update: Source 1 is ${reactiveSource1.value}, Source 2 is "${reactiveSource2.value}"`;
  console.log(dynamicContent.value);
});

function updateSources() {
  reactiveSource1.value += 5;
  reactiveSource2.value = reactiveSource2.value === 'Hello' ? 'Vue!' : 'Hello';
}
</script>

<template>
  <div class="about-view">
    <h1>About Us</h1>
    <p>{{ message }}</p>
    <p>This application demonstrates various features of Vue.js 3, Vue Router, and Pinia.</p>

    <section>
      <h2><code>watchEffect</code> Demo</h2>
      <p>{{ dynamicContent }}</p>
      <button @click="updateSources">Update Reactive Sources for watchEffect</button>
    </section>
  </div>
</template>

<style scoped>
.about-view {
  padding: 1rem;
}
.about-view section {
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
