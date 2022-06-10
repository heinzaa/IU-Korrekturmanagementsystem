<template>
    <nav id="header" class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
        <div class="container">
            <a v-if="userLoggedIn" id="logo" class="navbar-brand" href="/dashboard" title="Korrekturmanagementsystem"><img src="/kms-logo.svg" alt=""></a>
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

            <div class="collapse navbar-collapse navbar-right" id="mainmenu">
                <ul class="navbar-nav ms-auto">
                    <li v-if="!user" class="nav-item" @click="toHome">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li v-if="user" class="nav-item" @click="toHome">
                        <a class="nav-link active" aria-current="page" href="/dashboardTutor">Dashboard</a>
                    </li>
                    <li class="nav-item" @click="toPrivacy">
                        <a id="navLinkPrivacy" class="nav-link" href="/privacy">Datenschutz</a>
                    </li>
                    <li class="nav-item" @click="toImprint">
                        <a id="navLinkImprint" class="nav-link" href="/imprint">Impressum</a>
                    </li>
                    <li v-if="user" class="nav-item dropdown">
                        <!-- Mein Konto Menü -->
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownAccount" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <b-icon-person-circle style="font-size:1.4em; margin-top:-0.1em;"></b-icon-person-circle>&nbsp;&nbsp;Mein&nbsp;Konto
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownAccount">
                            <li><a class="dropdown-item" href="/createticket"><b-icon-plus-circle style="font-size:1.4em; margin-top:-0.1em;"></b-icon-plus-circle>&nbsp;&nbsp;Ticket erstellen</a></li>
                            <li><a class="dropdown-item" href="/dashboardStudent"><b-icon-bug style="font-size:1.4em; margin-top:-0.1em;"></b-icon-bug>&nbsp;&nbsp;Meine Tickets</a></li>
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

export default {
    setup(props, context){

        
        const { user } = getUser();
        const { error, logout } = useLogout();
        const router = useRouter();

        const userLoggedIn = ref(user);
        
        
        const logoutUser = async () => {
            await logout();
            console.log('user logged out');
            router.push({ name: 'Welcome' })
        }

        

       
        
        return { error, logoutUser, user, userLoggedIn }
   }
}
</script>

<style scoped>
.btn-group-sm>.btn, .btn-sm {
    padding: 0.5rem;
    font-size: .875rem;
    border-radius: 0.2rem;
}
.logout-svg{
    height: 1rem;   
    filter: invert(100%);
    margin-right: 0.5rem;
}
</style>