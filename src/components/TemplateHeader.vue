<template>
    <nav id="header" class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
        <div class="container">
            <a id="logo" class="navbar-brand" href="/" title="Korrekturmanagementsystem"><img src="/kms-logo.svg" alt=""></a>
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
                    <li class="nav-item" @click="toHome">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item" @click="toPrivacy">
                        <a id="navLinkPrivacy" class="nav-link" href="/privacy">Datenschutz</a>
                    </li>
                    <li class="nav-item" @click="toImprint">
                        <a id="navLinkImprint" class="nav-link" href="/imprint">Impressum</a>
                    </li>
                    <li v-if="user" class="nav-item" @click="logoutUser">
                        <a href="#" class="btn btn-secondary btn-sm">
                        <span> <img class="logout-svg" src="../assets/logout.svg" /> </span>Log out
                        </a>
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

export default {
    setup(props, context){

        const { user } = getUser();
        const { error, logout } = useLogout();
        const router = useRouter();
        
        const logoutUser = async () => {
            await logout();
            console.log('user logged out');
            router.push({ name: 'Welcome' })
        }

        const toPrivacy = () => {
            //this.addClass
        }
        
        return { error, logoutUser, user }
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