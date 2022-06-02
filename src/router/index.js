import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/Welcome.vue';
import Dashboard from '../views/Dashboard.vue';
import Verification from '../views/Verification.vue'
//import firebase from 'firebase';

import { projectAuth } from '../firebase/config'; 


const requireAuth = (to, from, next) =>{
  let user = projectAuth.currentUser;
  if(!user){
    next({ name: 'Welcome'})
  }
  else{
    next();
  }
}




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
    beforeEnter: requireAuth
    
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router