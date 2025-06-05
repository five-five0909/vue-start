<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: '#42b983' // Vue green
  },
  textColor: {
    type: String,
    default: 'white'
  }
});

const emit = defineEmits(['customClick']);

function handleClick(event) {
  emit('customClick', event);
}
</script>

<template>
  <button :style="{ backgroundColor: props.color, color: props.textColor }" @click="handleClick">
    <slot>Default Button Text</slot>
  </button>
</template>

<style scoped>
button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}
button:hover {
  opacity: 0.9;
}
</style>
