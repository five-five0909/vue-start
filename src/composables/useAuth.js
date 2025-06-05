import { ref, readonly } from 'vue';

// This is a simplified in-memory auth, in a real app, you'd use Pinia store
// or make API calls. This composable is for demonstrating basic composable structure.
// For app-wide auth state, authStore.js will be the source of truth.
const isAuthenticated = ref(false);
const user = ref(null);

export function useAuth() {
  // Mock login
  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'user' && password === 'password') {
          isAuthenticated.value = true;
          user.value = { id: 1, name: 'Test User', email: 'user@example.com', roles: ['user'] };
          console.log('useAuth: User logged in', user.value);
          resolve(user.value);
        } else if (username === 'admin' && password === 'password') {
          isAuthenticated.value = true;
          user.value = { id: 2, name: 'Admin User', email: 'admin@example.com', roles: ['admin', 'user'] };
          console.log('useAuth: Admin logged in', user.value);
          resolve(user.value);
        }
        else {
          console.error('useAuth: Login failed');
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  // Mock logout
  const logout = () => {
    isAuthenticated.value = false;
    user.value = null;
    console.log('useAuth: User logged out');
  };

  // Check status
  const checkStatus = () => {
    return readonly(isAuthenticated); // Expose as readonly to prevent external modification
  };

  const getCurrentUser = () => {
    return readonly(user);
  }

  return {
    isAuthenticated: readonly(isAuthenticated),
    user: readonly(user),
    login,
    logout,
    checkStatus,
    getCurrentUser
  };
}
