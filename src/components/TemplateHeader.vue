<template>
    <nav id="header" class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
        <div class="container">
            <a id="logo" :href="[userLoggedIn ? '/dashboard' : '/']" class="navbar-brand" title="Korrekturmanagementsystem"><img src="/kms-logo.svg" alt="Logo Korrekturmanagementsystem" width="154" height="36" /></a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainmenu"
                aria-controls="mainmenu"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div id="mainmenu" class="collapse navbar-collapse navbar-right">
                <ul class="navbar-nav ms-auto">
                    <li v-if="!user" class="nav-item" @click="toHome">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li v-if="user" class="nav-item" @click="toHome">
                        <a class="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
                    </li>
                    <li class="nav-item" @click="toPrivacy">
                        <a id="navLinkPrivacy" class="nav-link" href="/privacy">Datenschutz</a>
                    </li>
                    <li class="nav-item" @click="toImprint">
                        <a id="navLinkImprint" class="nav-link" href="/imprint">Impressum</a>
                    </li>
                    <li v-if="user" class="nav-item dropdown">
                        <!-- Mein Konto Menü -->
                        <a id="navbarDropdownAccount" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <b-icon-person-circle style="font-size:1.4em; margin-top:-0.1em;"></b-icon-person-circle>&nbsp;&nbsp;{{ user.displayName }}
                            <span v-if="isTutor">(Tutor)</span>
                            <span v-else>(Student)</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownAccount">
                            <li><a class="dropdown-item" href="/createticket"><b-icon-plus-circle style="font-size:1.4em; margin-top:-0.1em;"></b-icon-plus-circle>&nbsp;&nbsp;Ticket erstellen</a></li>
                            <li style="cursor:pointer;"><a class="dropdown-item" @click="navToDashboard"><b-icon-bug style="font-size:1.4em; margin-top:-0.1em; cursor:pointer; "></b-icon-bug>&nbsp;&nbsp;Meine erstellten Tickets</a></li>
                            <li><a class="dropdown-item" href="/userdata"><b-icon-person-circle style="font-size:1.4em; margin-top:-0.1em;"></b-icon-person-circle>&nbsp;&nbsp;Mein&nbsp;Konto</a></li>
                            <li><a class="dropdown-item" href="#" @click="logoutUser"><b-icon-box-arrow-right style="font-size:1.4em; margin-top:-0.1em;"></b-icon-box-arrow-right>&nbsp;&nbsp;Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import useLogout from '../composables/useLogout';
import getUser from '../composables/getUser';
import { useRouter } from 'vue-router';
import { ref } from "vue";
import useIsTutor from '../composables/useIsTutor';

export default {
    setup(){

        
        const { user } = getUser();
        const { isTutor } = useIsTutor();
        const { error, logout } = useLogout();
        const router = useRouter();
        const userLoggedIn = ref(user.value);
        
        
        const logoutUser = async () => {
            await logout();
            
            router.push({ name: 'Welcome' })
        }

        const navToDashboard = () =>{
            if(isTutor){
                router.push({ name: 'tutorTickets' })
                
            }else{
                router.push({ name: 'Dashboard' })
            }
        }

        
        return { error, logoutUser, user, isTutor, userLoggedIn, navToDashboard }
   }
}
</script>

<style>
</style>