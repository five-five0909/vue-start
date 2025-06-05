<template>
  <div class="not-found-view">
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<style scoped>
.not-found-view {
  text-align: center;
  padding: 2rem;
}
.not-found-view h1 {
  color: #ff6b6b;
}
</style>
