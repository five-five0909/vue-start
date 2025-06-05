import { ref, onMounted, onUnmounted } from 'vue';

export function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  onMounted(() => {
    console.log('useMousePosition onMounted: Adding mousemove listener');
    window.addEventListener('mousemove', update);
  });

  onUnmounted(() => {
    console.log('useMousePosition onUnmounted: Removing mousemove listener');
    window.removeEventListener('mousemove', update);
  });

  return { x, y };
}
