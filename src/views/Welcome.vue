<template>
    <div id="template">
        <nav id="header" class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
            <div class="container">
                <a id="logo" class="navbar-brand" href="/"><img src="/kms-logo.svg" alt=""></a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarsExample07"
                    aria-controls="navbarsExample07"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse navbar-right" id="navbarsExample07">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Mein Konto / Registrierung</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Datenschutz</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Impressum</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="welcome">
            <div v-if="showLogin">
                <h2>Login</h2>
                <LoginForm @login="enterDashboard" />
                <p>Passwort <span @click="showResetPasswordForm">vergessen</span>?</p>
                <p>Noch kein Konto? ➜ <span @click="showSignUpForm">Registrierung</span></p>
            </div>
            <div v-else-if="showResetPassword">
                <h2>Passwort zurücksetzen</h2>
                <ResetPasswordForm />
                <p>Bereits registriert? ➜ <span @click="showLoginForm">Login</span></p>
            </div>
            <div v-else-if="showSignUp">
                <h2>Registrierung</h2>
                <SignUpForm @SignUp="enterVerification" />
                <p>Bereits registriert? ➜ <span @click="showLoginForm">Login</span></p>
            </div>
        </div>
        <div id="footer">
            <div class="container">
                <img src="/iu-logo.svg" alt="Logo IU">
            </div>
        </div>
    </div>
</template>

<script>
import SignUpForm from "../components/SignUpForm.vue";
import LoginForm from "../components/LoginForm.vue";
import ResetPasswordForm from "../components/ResetPasswordForm.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
    components: { SignUpForm, LoginForm, ResetPasswordForm },
    setup() {
        const showLogin = ref(true);
        const showResetPassword = ref(false);
        const showSignUp = ref(false);

        const router = useRouter();

        const showLoginForm = () => {
            showLogin.value = true;
            showResetPassword.value = false;
            showSignUp.value = false;
        };
        const showResetPasswordForm = () => {
            showLogin.value = false;
            showResetPassword.value = true;
            showSignUp.value = false;
        };
        const showSignUpForm = () => {
            console.log("hallo");
            showLogin.value = false;
            showResetPassword.value = false;
            showSignUp.value = true;
        };

        const enterVerification = () => {
            router.push({ name: "Verification" });
        };

        const enterDashboard = () => {
            router.push({ name: "Dashboard" });
        };

        //return { showResetPassword, showLogin, enterDashboard }
        return {
            showLogin,
            showResetPassword,
            showSignUp,
            showLoginForm,
            showResetPasswordForm,
            showSignUpForm,
            enterVerification,
            enterDashboard,
        };
    },
};
</script>

<style>
.welcome {
    text-align: center;
    padding: 20px 0;
}
.welcome span {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
}

.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}

</style>