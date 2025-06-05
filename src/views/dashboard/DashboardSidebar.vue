<template>
  <div class="dashboard-sidebar">
    <h5>Dashboard Sidebar</h5>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link :to="{name: 'UserProfile', params: {id: '1'}}">User Profile 1</router-link></li>
    </ul>
  </div>
</template>
<style scoped>
.dashboard-sidebar { padding: 10px; }
.dashboard-sidebar ul { list-style: none; padding: 0; }
.dashboard-sidebar li a { text-decoration: none; color: #007bff; }
</style>
