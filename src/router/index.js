import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore'; // Ensure Pinia is initialized before router

// View Components (Lazy Loaded)
const HomeView = () => import('../views/HomeView.vue');
const AboutView = () => import('../views/AboutView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');
const LoginView = () => import('../views/LoginView.vue');
const UserProfileView = () => import('../views/UserProfileView.vue');

// User Nested Routes
const UserLayout = () => import('../views/UserLayout.vue');
const UserOverview = () => import('../views/user/UserOverview.vue');
const UserProfileSub = () => import('../views/user/UserProfileSub.vue');
const UserSettings = () => import('../views/user/UserSettings.vue');

const AdminPanelView = () => import('../views/AdminPanelView.vue');

// Named Views for Dashboard
const DashboardLayout = () => import('../views/DashboardLayout.vue');
const DashboardMain = () => import('../views/dashboard/DashboardMain.vue');
const DashboardSidebar = () => import('../views/dashboard/DashboardSidebar.vue');
const DashboardHeader = () => import('../views/dashboard/DashboardHeader.vue');

// Suspense Demo
const SuspenseDemoView = () => import('../views/SuspenseDemoView.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'Home Page' }
  },
  {
    path: '/main', // Alias for Home
    redirect: '/',
    alias: '/main-alias' // Demonstrating alias
  },
  {
    path: '/old-home', // Redirect example
    redirect: { name: 'Home' }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { title: 'About Us' }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Login' },
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isLoggedIn) {
        console.log('Login route beforeEnter: User already logged in, redirecting to Home.');
        next({ name: 'Home' }); // If already logged in, redirect from login page
      } else {
        next();
      }
    }
  },
  {
    path: '/users/:id', // Dynamic route
    name: 'UserProfile',
    component: UserProfileView,
    props: true, // Pass route.params as props to UserProfileView
    meta: { title: 'User Profile', requiresAuth: true }
  },
  {
    path: '/user/:userId', // Nested routes parent
    component: UserLayout, // The layout component for user section
    meta: { requiresAuth: true, title: 'User Section' },
    children: [
      {
        path: '', // Default child route, e.g., /user/:userId
        name: 'UserOverview',
        component: UserOverview,
        meta: { title: 'User Overview' }
      },
      {
        path: 'profile', // e.g., /user/:userId/profile
        name: 'UserProfileSub',
        component: UserProfileSub,
        meta: { title: 'User Sub Profile' }
      },
      {
        path: 'settings', // e.g., /user/:userId/settings
        name: 'UserSettings',
        component: UserSettings,
        meta: { title: 'User Settings' }
      }
    ]
  },
  {
    path: '/admin/panel',
    name: 'AdminPanel',
    component: AdminPanelView,
    meta: {
      title: 'Admin Panel',
      requiresAuth: true,
      roles: ['admin'] // Only users with 'admin' role can access
    },
    beforeEnter: (to, from, next) => {
      // Example of a route-specific guard
      console.log(`AdminPanel beforeEnter: Checking access for path ${to.path}`);
      // Additional checks specific to this route can go here
      // Role check is handled by global beforeEach, but this is for demonstration
      next();
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardLayout, // Layout for named views
    meta: { title: 'Dashboard', requiresAuth: true },
    children: [ // Children are not strictly necessary here if all content is via named views, but can be used
        {
            path: '', // Default path for the dashboard
            components: {
                default: DashboardMain,
                sidebar: DashboardSidebar,
                header: DashboardHeader
            },
            name: 'DashboardDetail', // Optional name for the specific set of components
            meta: { title: 'Main Dashboard' }
        }
    ]
  },
  {
    path: '/suspense',
    name: 'SuspenseDemo',
    component: SuspenseDemoView,
    meta: { title: 'Suspense Demo' }
  },
  {
    path: '/:pathMatch(.*)*', // 404 Not Found, matches everything
    name: 'NotFound',
    component: NotFoundView,
    meta: { title: 'Page Not Found' }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log('scrollBehavior: to=', to.name, 'from=', from.name, 'savedPosition=', savedPosition);
    if (savedPosition) {
      return savedPosition; // Keep position on back/forward
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth', // Smooth scroll to hash
      };
    }
    return { top: 0, left: 0 }; // Scroll to top by default
  }
});

// Global Navigation Guard (beforeEach)
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Get auth store

  // Update page title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' - Vue Demo App';
  } else {
    document.title = 'Vue Demo App';
  }

  console.log(`Router beforeEach: Navigating from ${from.name || 'start'} to ${to.name}. Needs auth? ${!!to.meta.requiresAuth}`);

  // Authentication check
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    console.log('Router beforeEach: Not authenticated for a protected route. Redirecting to login.');
    authStore.setRedirectAfterLogin(to.fullPath); // Store the intended path
    next({ name: 'Login' });
  }
  // Role check (if requiresAuth is also true, which is typical)
  else if (to.meta.requiresAuth && to.meta.roles) {
    const userRoles = authStore.currentUserRoles;
    const hasRequiredRole = to.meta.roles.some(role => userRoles.includes(role));
    if (!hasRequiredRole) {
      console.warn(`Router beforeEach: User does not have required roles (${to.meta.roles.join(', ')}) for route ${to.name}. Redirecting to Home or an unauthorized page.`);
      // Optionally, redirect to an 'Unauthorized' page or show a message
      // For now, redirecting to home as a fallback.
      next({ name: 'Home' }); // Or a dedicated 'Unauthorized' view
    } else {
      console.log(`Router beforeEach: User has required roles. Access granted to ${to.name}.`);
      next(); // User is authenticated and has the role
    }
  }
  else {
    next(); // No auth required, or user is authenticated and no specific roles needed
  }
});

export default router;
