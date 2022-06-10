import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import { projectAuth } from './firebase/config';
import './assets/main.css'

// Variable damit die app nur einmalig gemountet wird, beim ersten mal
let app;


// fires every time firebase detects a change in authentication
projectAuth.onAuthStateChanged(() => {

    if(!app){
   app = createApp(App)
    .use(router)
    .use(BootstrapIconsPlugin)
    .mount('#app')
    }

})
