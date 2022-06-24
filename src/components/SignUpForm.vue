<template>
    <div class="form-signin">
        <form @submit.prevent="handleSubmit">
            <div class="error mb-2">{{error}}</div>
            <div class="form-floating mb-2">
                <input type="text" required class="form-control" id="floatingVorname" placeholder="Max" v-model="displayName">
                <label for="floatingVorname">Vorname</label>
            </div>
            <div class="form-floating mb-2">
                <input type="email" required class="form-control" id="floatingEmail" placeholder="mein.name@iubh-fernstudium.de" v-model="email">
                <label for="floatingEmail">IU E-Mail-Adresse</label>
            </div>
            <div class="form-floating mb-3">
                <input v-bind:type="[showPassword ? 'text' : 'password']" required class="form-control" id="floatingPassword" placeholder="Passwort" v-model="password">
                <span class="showPasswordIcon" @click="showPassword = !showPassword">
                    <b-icon-eye v-if="!showPassword"></b-icon-eye>
                    <b-icon-eye-slash v-if="showPassword"></b-icon-eye-slash>
                </span>
                <label for="floatingPassword">Passwort</label>
            </div>
            <div class="form-floating mb-3">
                <input v-bind:type="[showPasswordControl ? 'text' : 'password']" required class="form-control" id="floatingPasswordControl" placeholder="Passwort" v-model="passwordControl">
                <span class="showPasswordIcon" @click="showPasswordControl = !showPasswordControl">
                    <b-icon-eye v-if="!showPasswordControl"></b-icon-eye>
                    <b-icon-eye-slash v-if="showPasswordControl"></b-icon-eye-slash>
                </span>
                <label for="floatingPasswordControl">Passwort wiederholen</label>
                <span v-if="isPasswordCorrect"> Passwörter stimmen nicht überein. </span>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Konto erstellen</button>
            
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
        const passwordControl = ref('');
        const isPasswordCorrect = ref(false);
        const showPassword = ref(false);
        const showPasswordControl = ref(false);

            const handleSubmit = async() => {

            if(password.value == passwordControl.value){
                    await signup(email.value, password.value, displayName.value);     
            
                 if(!error.value){
                    context.emit('SignUp');            
                }            
            }
            else{
                isPasswordCorrect.value = true;
                
            }
            
           
            
        }
        
        
        
        return {displayName, email, password, passwordControl, handleSubmit, error, isPasswordCorrect, showPasswordControl, showPassword}
   }
}
</script>

<style>
</style>