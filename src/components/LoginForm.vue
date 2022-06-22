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
                <input v-bind:type="[showPassword ? 'text' : 'password']" required class="form-control input-group-append" id="floatingPassword" placeholder="Passwort" v-model="password">
                <span class="input-group-text">
                <b-icon-eye style="cursor:pointer" @click="showPassword = !showPassword"></b-icon-eye>
                </span>
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
export default {
   setup(props, context){
      
       const email = ref('');
       const password = ref('');
       const { error, login, isPending } = useLogin(); 
       const showPassword = ref(false);


       const handleSubmit = async () => {
          await login(email.value, password.value)
          if(!error.value){
              context.emit('login');
          }
      }
       return { email, password, handleSubmit, error, showPassword, isPending}
   }
}
</script>

<style>
</style>