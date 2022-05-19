<template>
  <div class="welcome container">
      <p>Welcome</p>
    <div v-if="showLogin">
        <h2>Login</h2>
        <LoginForm @login="enterDashboard" />
        
       <!-- <span @click="showResetPassword = false ">Forgot password?</span> -->
        <p>No account yet? <span @click="showLogin = false ">Signup</span></p>
        
    </div>

      <!--<div v-else-if="showResetPassword">
          <h2>Reset password</h2>
          <ResetPasswordForm />
           <p>No account yet? <span @click="showLogin = false">Signup</span></p>

        </div> -->


    <div v-else>
        <h2>Sign up</h2>
      <SignUpForm @SignUp="enterDashboard"/> 
        <p>Already registered? <span @click="showLogin = true">Login</span></p>

       
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
        const showResetPassword = ref(true)
        const router = useRouter()
        
        const enterDashboard = () => { 
            router.push({ name: 'Dashboard'})
        } 
        return { showResetPassword, showLogin, enterDashboard }
    }
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