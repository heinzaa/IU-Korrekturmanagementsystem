<template>
  <div class="welcome container">
      <p>Welcome</p>
    <div v-if="showLogin">
        <h2>Login</h2>
        <LoginForm @login="enterDashboard" />
        <p>Passwort <span @click="showResetPasswordForm"> vergessen</span>?</p>    
        <p>No account yet? <span @click="showSignUpForm">Signup</span></p>        
    </div>
    <div v-else-if="showResetPassword">
        <h2>Passwort zurücksetzen</h2>
            <ResetPasswordForm />
            <p>Already registered?<span @click="showLoginForm">Login</span></p>
    </div>
    <div v-else-if="showSignUp">
        <h2>Sign up</h2>
      <SignUpForm @SignUp="enterVerification"/> 
        <p>Already registered?<span @click="showLoginForm">Login</span></p>
    </div>  
  </div>
</template>

<script>
import SignUpForm from '../components/SignUpForm.vue'
import LoginForm from '../components/LoginForm.vue'
import ResetPasswordForm from '../components/ResetPasswordForm.vue'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
    components: { SignUpForm, LoginForm, ResetPasswordForm },
    setup(){
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
            router.push({ name: 'Verification'})
        } 
        
        const enterDashboard = () => {
            router.push({ name: 'Dashboard' })
        }

        //return { showResetPassword, showLogin, enterDashboard }
        return {  showLogin, showResetPassword, showSignUp, showLoginForm, showResetPasswordForm, showSignUpForm,  enterVerification, enterDashboard }
    },
   
}
</script>

<style>
.welcome{
    text-align: center;
    padding: 20px 0;
}
.welcome form {
    width: 300px;
    margin: 20px auto;
}
.welcome input{
    display: block;
    margin: 20px 0 10px;
}
.welcome input{
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
}
.welcome span {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
}
.welcome button {
    margin: 20px auto;
}
</style>