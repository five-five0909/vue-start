import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import router from '../router'; // Assuming router is configured to be imported

export const useAuthStore = defineStore('auth', () => {
  // State
  const isAuthenticated = ref(false);
  const user = ref(null); // To store user info like { id, name, roles }
  const redirectAfterLogin = ref(null); // To store the path to redirect to after login

  // Getters
  const isLoggedIn = computed(() => isAuthenticated.value);
  const currentUser = computed(() => user.value);
  const currentUserRoles = computed(() => user.value?.roles || []);

  // Actions
  async function login(credentials) {
    console.log('authStore: Attempting login with credentials:', credentials);
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username === 'user' && credentials.password === 'password') {
          isAuthenticated.value = true;
          user.value = { id: 'user123', name: 'Test User', email: 'user@example.com', roles: ['user'] };
          console.log('authStore: Login successful for user', user.value);
          if (redirectAfterLogin.value && router) {
            router.push(redirectAfterLogin.value);
            redirectAfterLogin.value = null;
          } else if (router) {
            router.push('/'); // Default redirect to home
          }
          resolve(user.value);
        } else if (credentials.username === 'admin' && credentials.password === 'password') {
          isAuthenticated.value = true;
          user.value = { id: 'admin456', name: 'Admin User', email: 'admin@example.com', roles: ['admin', 'user'] };
          console.log('authStore: Login successful for admin', user.value);
           if (redirectAfterLogin.value && router) {
            router.push(redirectAfterLogin.value);
            redirectAfterLogin.value = null;
          } else if (router) {
            router.push('/'); // Default redirect to home
          }
          resolve(user.value);
        } else {
          console.error('authStore: Login failed - Invalid credentials');
          reject(new Error('Invalid username or password'));
        }
      }, 1000);
    });
  }

  function logout() {
    isAuthenticated.value = false;
    user.value = null;
    console.log('authStore: User logged out');
    if (router) {
      router.push('/login'); // Redirect to login page after logout
    }
  }

  // Action to simulate fetching user data if a token were stored (e.g., on app load)
  async function fetchUser() {
    console.log('authStore: Attempting to fetch user (simulated)');
    // This would typically involve checking a token and making an API call
    // For this demo, we'll assume if there's a user in localStorage (not implemented here)
    // or if the state is already set, that's our "fetched" user.
    if (user.value) {
      isAuthenticated.value = true;
      console.log('authStore: User already in store or fetched (simulated)', user.value);
      return Promise.resolve(user.value);
    }
    // Simulate a case where no user is found or token is invalid
    isAuthenticated.value = false;
    user.value = null;
    console.log('authStore: No user session found (simulated)');
    return Promise.resolve(null);
  }

  function setRedirectAfterLogin(path) {
    redirectAfterLogin.value = path;
  }

  return {
    isAuthenticated,
    user,
    isLoggedIn,
    currentUser,
    currentUserRoles,
    login,
    logout,
    fetchUser,
    redirectAfterLogin,
    setRedirectAfterLogin
  };
});
