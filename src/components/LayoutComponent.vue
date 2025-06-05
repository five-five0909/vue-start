<template>
  <div class="layout-container">
    <header class="layout-header">
      <slot name="header">Default Header</slot>
    </header>
    <main class="layout-main">
      <slot>Default Main Content</slot>
    </main>
    <footer class="layout-footer">
      <slot name="footer">Default Footer</slot>
    </footer>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100px; /* Example minimum height */
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}
.layout-header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}
.layout-main {
  padding: 1rem;
  flex-grow: 1;
}
.layout-footer {
  background-color: #f8f9fa;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
}
</style>
