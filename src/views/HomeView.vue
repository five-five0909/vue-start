<script setup>
import { ref, onMounted } from 'vue';
import { useCounterStore } from '../stores/counterStore';
import CustomButton from '../components/CustomButton.vue';
import LayoutComponent from '../components/LayoutComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';
import ItemList from '../components/ItemList.vue';
import { useMousePosition } from '../composables/useMousePosition.js';

const counterStore = useCounterStore();
const { x, y } = useMousePosition();

const showModal = ref(false);

function handleCustomClick() {
  alert('Custom button clicked on Home page!');
  counterStore.increment();
}

onMounted(() => {
  console.log('HomeView onMounted hook called.');
});
</script>

<template>
  <div class="home-view">
    <h1>Home Page</h1>
    <p>Welcome to the Vue 3 Demo Application!</p>

    <section>
      <h2>Mouse Position (Composable Demo)</h2>
      <p>Mouse X: {{ x }}, Mouse Y: {{ y }}</p>
    </section>

    <section>
      <h2>Counter (Pinia Demo)</h2>
      <p>Count: {{ counterStore.count }}</p>
      <p>Double Count: {{ counterStore.doubleCount }}</p>
      <CustomButton @customClick="counterStore.increment" color="blue" textColor="white">Increment</CustomButton>
      <CustomButton @customClick="counterStore.decrement" color="red" textColor="white" style="margin-left: 10px;">Decrement</CustomButton>
    </section>

    <section>
      <h2>Custom Button (Component Demo)</h2>
      <CustomButton @customClick="handleCustomClick">Click Me!</CustomButton>
    </section>

    <section>
      <h2>Layout Component (Named Slots Demo)</h2>
      <LayoutComponent>
        <template #header>
          <h3>Custom Header in Layout</h3>
        </template>
        <p>This is the main content passed to the layout's default slot.</p>
        <template #footer>
          <p>&copy; Custom Footer in Layout</p>
        </template>
      </LayoutComponent>
    </section>

    <section>
      <h2>Modal Component (Teleport Demo)</h2>
      <CustomButton @customClick="showModal = true">Show Modal</CustomButton>
      <ModalComponent :show="showModal" @close="showModal = false">
        <p>This content is passed into the modal's default slot from HomeView.</p>
      </ModalComponent>
    </section>

    <section>
      <h2>Item List (Scoped Slot Demo)</h2>
      <ItemList>
        <template #item="{ itemData, itemIndex }">
          <div class="custom-item-layout">
            <h4>{{ itemIndex + 1 }}. {{ itemData.text }} (Custom Layout)</h4>
            <p><em>{{ itemData.description }}</em></p>
          </div>
        </template>
      </ItemList>
    </section>
  </div>
</template>

<style scoped>
.home-view section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}
.custom-item-layout {
  background-color: #e9f7ef;
  padding: 10px;
  border-radius: 4px;
}
.custom-item-layout h4 {
  margin: 0 0 5px 0;
  color: #1a535c;
}
.custom-item-layout p {
  margin: 0;
  color: #4ecdc4;
}
</style>
