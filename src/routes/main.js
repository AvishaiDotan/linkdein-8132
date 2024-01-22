import { createRouter, createWebHistory } from 'vue-router';
import appHome from '../../src/components/app-home.vue'
import connectionBoard from '../../src/components/connections-board.vue'
const routes = [
    {
      path: '/',
      component: appHome
    },
    {
      path: '/connections',
      component: connectionBoard
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;