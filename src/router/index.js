import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/Welcome.vue';
import PageImprint from '../views/PageImprint.vue';
import PagePrivacy from '../views/PagePrivacy.vue';
import Dashboard from '../views/Dashboard.vue';
import Verification from '../views/Verification.vue';
import firebase from 'firebase';



const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/verification',
    name: 'Verification',
    component: Verification
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    //meta: 
    //  requiresAuth: true
    //
  },
  {
    path: '/imprint',
    name: 'PageImprint',
    component: PageImprint
  },
  {
    path: '/privacy',
    name: 'PagePrivacy',
    component: PagePrivacy
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;

  if (requiresAuth && !isAuthenticated)
    next("/dashboard");
  else
    next();
})

export default router