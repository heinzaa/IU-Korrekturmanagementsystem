<template>
    <div id="template">
        <TemplateHeader />
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
        <TemplateFooter />
    </div>
</template>

<script>
import TemplateHeader from "../components/TemplateHeader.vue";
import TemplateFooter from "../components/TemplateFooter.vue";
import SignUpForm from "../components/SignUpForm.vue";
import LoginForm from "../components/LoginForm.vue";
import ResetPasswordForm from "../components/ResetPasswordForm.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
    components: { TemplateHeader, TemplateFooter, SignUpForm, LoginForm, ResetPasswordForm },
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
</style>