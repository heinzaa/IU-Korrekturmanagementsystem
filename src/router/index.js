import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/Welcome.vue';
import PageImprint from '../views/PageImprint.vue';
import PagePrivacy from '../views/PagePrivacy.vue';
import Dashboard from '../views/Dashboard.vue';
import UserAccount from '../views/UserAccount.vue';
import CreateTicket from '../views/CreateTicket.vue';
import allTickets from '../views/allTickets.vue';
import TicketDetails from '../views/TicketDetails.vue';
import TutorTickets from '../views/TutorTickets.vue';

import tutor_course from '../assets/tutor_course.json';

import { projectAuth } from '../firebase/config';



const requireAuth = (to, from, next) => {
  
  let user = projectAuth.currentUser;
  let isTutor = tutor_course.find(item => item.email == user.email);
  if (!user || !user.emailVerified && !isTutor) {
    window.alert("Um auf die gewünschte Seite navigieren zu können, müssen Sie angemeldet sein und ihre Email verifiziert haben.")
    next({ name: 'Welcome' })
  }
  else {
    next();
  }
}

const requireStatus = (to, from, next) => {
  let user = projectAuth.currentUser;
  let isTutor = tutor_course.find(item => item.email == user.email);
  if (!user || !user.emailVerified && !isTutor) {
    window.alert("Um auf die gewünschte Seite navigieren zu können, müssen Sie angemeldet sein und ihre Email verifiziert haben.")
    next({ name: 'Welcome' })
  }
  else {
    next();
  }

}


// const userIsTutor = (to,from, next) => {
//   let user = projectAuth.currentUser;
//   let isTutorLoggedIn = tutor_course.find(item => item.email == user.email);
//   if(isTutorLoggedIn != null){
//     next();
//   }
//   else{
//     next(from.path)
//   }
// }

 






const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    
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
    component: PageImprint,
  },
  {
    path: '/privacy',
    name: 'Datenschutz',
    component: PagePrivacy,
  },
  {
    path: '/userdata',
    name: 'Mein Konto',
    component: UserAccount,
    beforeEnter: requireAuth
  },
  {
    path: '/createticket',
    name: 'CreateTicket',
    component: CreateTicket,
    beforeEnter: requireAuth
  },
  {
    path: '/tutorTickets',
    name: 'tutorTickets',
    component: TutorTickets,
    beforeEnter: requireAuth
  },
  {
    path: '/tickets',
    name: 'Ticket',
    component: allTickets,
    beforeEnter: requireStatus
  }, 
  {
    path: '/ticket/:id',
    name: 'TicketDetails',
    component: TicketDetails,
    beforeEnter: requireAuth,
    props: true,
  }
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