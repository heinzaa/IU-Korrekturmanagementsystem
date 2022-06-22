<template>
    <div class="form-signin">
        <form @submit.prevent="handleSubmit">
            <div class="error mb-2">{{error}}</div>
            <!--<b-icon-eye></b-icon-eye>-->
            <div class="form-floating mb-2">
                <input type="email" required class="form-control" id="floatingEmail" placeholder="mein.name@iubh-fernstudium.com" v-model="email">
                <label for="floatingEmail">IU E-Mail-Adresse</label>
            </div>            
            <div class="form-floating mb-3">
                <input v-bind:type="[showPassword ? 'text' : 'password']" required class="form-control" id="floatingPassword" placeholder="Passwort" v-model="password">
                <b-icon-eye style="cursor:pointer" @click="showPassword = !showPassword"></b-icon-eye>
                <label for="floatingPassword">Passwort</label>
            </div>
            <button v-if="!isPending" class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
            <button v-if="isPending" class="w-100 btn btn-lg btn-primary" type="submit">Loading</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composables/useLogin'
import tutor_course from "../assets/tutor_course.json";

export default {

    data(){
        return{
            courseList: tutor_course
        };
    },

   setup(props, context){
      
       const email = ref('');
       const password = ref('');
       const { error, login, isPending } = useLogin(); 
       const showPassword = ref(false);

      

       const handleSubmit = async () => {
           
            let emailValid = tutor_course.find(item => item.email === email.value);

            if(emailValid != null ){
                await login(email.value, password.value)
            if(!error.value){
              context.emit('loginTutor');
            }
         }
         else{
            error.value = "Die angegebene Email ist nicht im System hinterlegt."
        }
        
        }
       return { email, password, handleSubmit, error, showPassword, isPending}
   }
}
</script>

<style>
</style>