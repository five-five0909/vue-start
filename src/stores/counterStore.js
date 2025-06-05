import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0);

  // Getters
  const doubleCount = computed(() => count.value * 2);

  // Actions
  function increment() {
    count.value++;
    console.log('counterStore: increment, new count:', count.value);
  }

  function decrement() {
    count.value--;
    console.log('counterStore: decrement, new count:', count.value);
  }

  return { count, doubleCount, increment, decrement };
});
