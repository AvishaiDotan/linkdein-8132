import { createRouter, createWebHistory } from 'vue-router';
import appHome from '../../src/components/app-home.vue'
import connectionBoard from '../../src/components/connections-board.vue'
import appLogin from '../../src/components/app-login.vue'
import userArea from '../../src/components/user-area.vue'

import { getLocalStorage } from '../services/localStorage.service';
import { authenticateUser } from '../services/user.service';
const routes = [
  {
    path: '/',
    component: appHome,
    meta: { requiresAuth: true } // Add this meta field for pages that require authentication
  },
  {
    path: '/connections',
    component: connectionBoard,
    meta: { requiresAuth: true } // Add this meta field for pages that require authentication
  },
  {
    path: '/login',
    component: appLogin
  },
  {
    path: "/user",
    component: userArea,
    meta: { requiresAuth: true } // Add this meta field for pages that require authentication
  }
  ];

  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  
  router.beforeEach(async (to, from, next) => {
    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
      // Check if the user is authenticated (you need to implement this logic)
      const isAuthenticated = await authenticateUser()
      
      // If the user is not authenticated, redirect to the login page
      if (!isAuthenticated) {
        next('/login');
      } else {
        // If the user is authenticated, proceed to the requested route
        next();
      }
    } else {
      // If the route does not require authentication, proceed to the requested route
      next();
    }
  });


  
  export default router;