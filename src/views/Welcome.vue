<template>
    <div id="template">
        <TemplateHeader />
       <!-- <button @click="sendEmailVerification"> Verifizierungslink erneut senden</button> -->
        <div class="welcome container content-small content-center">
            <div v-if="showLogin">
                <h1>Korrektur&shy;management&shy;system</h1>
                <p>Die Nutzung des Korrekturmanagementsystems ist ausschließlich für private Zwecke und berechtigte Personen der IU gestattet.</p>
                <p>&nbsp;</p>
                <h2>Login</h2>
                <p class="error">{{emailNotVerified}}</p>
                <LoginForm @login="enterDashboard" />
                <p><span @click="showResetPasswordForm">Passwort vergessen?</span></p>
                <p>Noch kein Konto? ➜ <span @click="showSignUpForm">Registrierung</span></p>
              
            </div>
            <div v-else-if="showResetPassword">
                <h1>Passwort zurücksetzen</h1>
                <p>Bitte gib die E-Mail-Adresse zu Deinem Profil ein.
                    Wir senden dir dann einen Link, mit dem Du ein neues Kennwort festlegen kannst.</p>
                <ResetPasswordForm />
                <p>Bereits registriert? ➜ <span @click="showLoginForm">Login</span></p>
            </div>
            <div v-else-if="showSignUp">
                <h1>Registrierung</h1>
                <p>Für die Registrierung eines neuen Kontos ist die Zugehörigkeit zur Hochschule erforderlich. Hierzu wird die E-Mail-Adresse der IU benötigt.
                    <br><small>(iubh-fernstudium.de, iu-fernstudium.de, iubh.de, iu.org)</small></p>
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
import { projectAuth } from '../firebase/config';
import { ref } from "vue";
import { useRouter } from "vue-router";
import tutor_course from '../assets/tutor_course.json';
export default {
    components: { TemplateHeader, TemplateFooter, SignUpForm, LoginForm, ResetPasswordForm, VerficationPopUp },
    beforeRouteLeave(to, from, next) {
            
            let user = projectAuth.currentUser;
            let isTutor = tutor_course.find(item => item.email == user.email);

            
                if (!user || !user.emailVerified && !isTutor)  {
                this.emailNotVerified= "Um zum Dashboard zu gelangen, müssen Sie ihre Email verifizieren!"
                next({ name: 'Welcome' })
            }
            else {
                next();
            }

    },
    
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

        const showLoginTutorForm = () => {
            showLogin.value = false;
            showResetPassword.value = false;
            showVerificationPopUp.value = false;
            showSignUp.value = false;
            
        };
      

        const enterDashboard = () => {
           
            router.push('/dashboard')
        };

        const enterVerificationPopUp = () => {
            showLogin.value = false;
            showResetPassword.value = false;
            showSignUp.value = false;
            showVerificationPopUp.value = true;            
        }

      
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
            showLoginTutorForm
        };
    },
    
     data() {
        return {
            emailNotVerified: ''
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