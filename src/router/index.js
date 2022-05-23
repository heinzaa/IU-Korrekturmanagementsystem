import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/Welcome.vue';
import Dashboard from '../views/Dashboard.vue';
import Verification from '../views/Verification.vue'
import firebase from 'firebase';



const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {   path: '/Verification',
    name: 'Verification',
    component: Verification
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    //meta: 
    //  requiresAuth: true
    //
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=> {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = firebase.auth().currentUser;

    if(requiresAuth && !isAuthenticated)
      next("/Dashboard");
     else 
      next();       
}) 

export default router