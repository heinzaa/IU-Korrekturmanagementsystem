<template>
    <!--
    <form @submit.prevent="handleSubmit">
        <input type="text" required placeholder="display name" v-model="displayName" />
        <input type="email" required placeholder="email" v-model="email" />
        <input type="password" required placeholder="password" v-model="password" />
        <div class="error"> {{error}}</div>
        <button id="login-btn">Sign up </button>
    </form>
    -->

    <div class="form-signin">
        <form @submit.prevent="handleSubmit">
            <div class="error mb-2">{{error}}</div>
            <div class="form-floating mb-2">
                <input type="text" class="form-control" id="floatingEmail" placeholder="Max" v-model="displayName">
                <label for="floatingEmail">Mein Name</label>
            </div>
            <div class="form-floating mb-2">
                <input type="email" class="form-control" id="floatingEmail" placeholder="mein.name@iubh-fernstudium.com" v-model="email">
                <label for="floatingEmail">Meine IU E-Mail-Adresse</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Passwort" v-model="password">
                <label for="floatingPassword">Passwort</label>
            </div>
            <button id="login-btn" class="w-100 btn btn-lg btn-primary" type="submit">Konto erstellen</button>
        </form>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignup from '../composables/useSignup'
export default {

   setup(props, context){ 

       const { error, signup } = useSignup()
       // refs
        const displayName = ref('');
        const email = ref('');
        const password = ref('');

            const handleSubmit = async() => {
                await signup(email.value, password.value, displayName.value);
            
            if(!error.value){
              context.emit('SignUp');
            }
        }
        
        
        
        return {displayName, email, password, handleSubmit, error}
   }
}
</script>

<style>
 #login-btn {
        cursor: pointer;
    }
</style>