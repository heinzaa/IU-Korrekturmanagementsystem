<template>
    <div id="template">
        <TemplateHeader />
        <div class="welcome container content-small content-center">
            <div v-if="showLogin">
                <h1>Korrektur&shy;management&shy;system</h1>
                <p>Die Nutzung des Korrekturmanagementsystems ist ausschließlich für private Zwecke und berechtigte Personen der IU gestattet.</p>
                <p>&nbsp;</p>
                <h2>Login</h2>
                <LoginForm @login="enterDashboard" />
                <p>Passwort <span @click="showResetPasswordForm">vergessen</span>?</p>
                <p>Noch kein Konto? ➜ <span @click="showSignUpForm">Registrierung</span></p>
                <!-- <CorrectionForm /> -->
            </div>
            <div v-else-if="showResetPassword">
                <h1>Passwort zurücksetzen</h1>
                <p>Bitte gib die E-Mail-Adresse zu deinem Profil ein.
                    Wir senden dir dann einen Link, mit dem du ein neues Kennwort festlegen kannst.</p>
                <ResetPasswordForm />
                <p>Bereits registriert? ➜ <span @click="showLoginForm">Login</span></p>
            </div>
            <div v-else-if="showSignUp">
                <h1>Registrierung</h1>
                <p>Für die Registrierung eines neuen Kontos ist die Zugehörigkeit zur Hochschule erforderlich. Hierzu wird die E-Mail-Adresse der IU benötigt.</p>
                <SignUpForm @SignUp="enterVerificationPopUp" />
                <p>Bereits registriert? ➜ <span @click="showLoginForm">Login</span></p>
            </div>
            <div v-else-if="showVerificationPopUp">
                <VerficationPopUp @toLoginComponent="showLoginForm" />
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
import VerficationPopUp from "../components/VerificationPopUp.vue"
import ResetPasswordForm from "../components/ResetPasswordForm.vue";
import CorrectionForm from "../components/CorrectionForm.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
    components: { TemplateHeader, TemplateFooter, SignUpForm, LoginForm, ResetPasswordForm, VerficationPopUp, CorrectionForm },
    setup() {
        const showLogin = ref(true);
        const showResetPassword = ref(false);
        const showSignUp = ref(false);
        const showVerificationPopUp = ref(false);

        const router = useRouter();

        const showLoginForm = () => {
            showLogin.value = true;
            showResetPassword.value = false;
            showSignUp.value = false;
            showVerificationPopUp.value = false;
        };
        const showResetPasswordForm = () => {
            showLogin.value = false;
            showResetPassword.value = true;
            showSignUp.value = false;
            showVerificationPopUp.value = false;
        };
        const showSignUpForm = () => {
            showLogin.value = false;
            showResetPassword.value = false;
            showVerificationPopUp.value = false;
            showSignUp.value = true;
        };

       

        const enterDashboard = () => {
            router.push({ name: "Dashboard" });
        };

        const enterVerificationPopUp = () => {
            showLogin.value = false;
            showResetPassword.value = false;
            showSignUp.value = false;
            showVerificationPopUp.value = true;
        }

        //return { showResetPassword, showLogin, enterDashboard }
        return {
            showLogin,
            showResetPassword,
            showSignUp,
            showLoginForm,
            showResetPasswordForm,
            showSignUpForm,
            showVerificationPopUp,
            enterVerificationPopUp,
            enterDashboard,
        };
    },
};
</script>

<style>
.welcome {
    text-align: center;
}
.welcome span {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
}
</style>