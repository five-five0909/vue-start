<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}
</script>

<template>
  <Teleport to="body">
    <div v-if="props.show" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Modal Title</h2>
        <p>This is the modal content.</p>
        <slot>Default modal body</slot>
        <button @click="closeModal">Close Modal</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  text-align: center;
}
.modal-content h2 {
  margin-top: 0;
}
.modal-content button {
  margin-top: 15px;
  padding: 8px 15px;
}
</style>
