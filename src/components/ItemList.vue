<script setup>
import { ref } from 'vue';

const items = ref([
  { id: 1, text: 'Item 1', description: 'Description for item 1' },
  { id: 2, text: 'Item 2', description: 'Description for item 2' },
  { id: 3, text: 'Item 3', description: 'Description for item 3' }
]);
</script>

<template>
  <div class="item-list">
    <h3>Item List (Scoped Slot Demo)</h3>
    <ul>
      <li v-for="item in items" :key="item.id">
        <!-- Pass item data to the slot -->
        <slot name="item" :item-data="item" :item-index="items.indexOf(item)">
          <!-- Fallback content if no slot is provided -->
          <strong>{{ item.text }}</strong> - <em>{{ item.description }}</em>
        </slot>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.item-list {
  border: 1px solid #eee;
  padding: 1rem;
  margin-top: 1rem;
}
.item-list h3 {
  margin-top: 0;
}
.item-list ul {
  list-style: none;
  padding: 0;
}
.item-list li {
  background-color: #f9f9f9;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}
</style>
