<template>
  <div class="dashboard-layout">
    <h2>Dashboard (Named Views Demo)</h2>
    <header class="dashboard-header-container">
      <router-view name="header"></router-view>
    </header>
    <div class="dashboard-body">
      <aside class="dashboard-sidebar-container">
        <router-view name="sidebar"></router-view>
      </aside>
      <main class="dashboard-main-container">
        <router-view name="default"></router-view> <!-- or just <router-view /> -->
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  border: 2px solid #28a745;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
}
.dashboard-layout h2 {
  margin-top: 0;
}
.dashboard-header-container {
  background-color: #e9ecef;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}
.dashboard-body {
  display: flex;
}
.dashboard-sidebar-container {
  width: 200px;
  margin-right: 1rem;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
}
.dashboard-main-container {
  flex-grow: 1;
  background-color: #ffffff;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}
</style>
