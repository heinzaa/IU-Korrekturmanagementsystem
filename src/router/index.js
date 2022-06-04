import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/Welcome.vue';
import PageImprint from '../views/PageImprint.vue';
import PagePrivacy from '../views/PagePrivacy.vue';
import Dashboard from '../views/Dashboard.vue';
import UserAccount from '../views/UserAccount.vue';
import CreateTicket from '../views/CreateTicket.vue';

import { projectAuth } from '../firebase/config';


const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: 'Welcome' })
  }
  else {
    next();
  }
}




const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: requireAuth

  },
  {
    path: '/imprint',
    name: 'Impressum',
    component: PageImprint
  },
  {
    path: '/privacy',
    name: 'Datenschutz',
    component: PagePrivacy
  },
  {
    path: '/userdata',
    name: 'Mein Konto',
    component: UserAccount
  },
  {
    path: '/createticket',
    name: 'Neue Meldung erstellen',
    component: CreateTicket
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
})


export default router