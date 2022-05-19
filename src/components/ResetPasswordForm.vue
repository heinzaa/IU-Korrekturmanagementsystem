<template>
  <form @submit.prevent="handleSubmit">      
      <input type="email" required placeholder="email" v-model="email" />
   
      <!--<div class="error">{{error}}</div>
      <button id="login">Log in </button> -->
      <div class="error">{{error}}</div>
      <button id="reset-password">Reset password </button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useResetPassword from '../composables/useResetPassword'
export default {
   setup(props, context){
      
       const email = ref('');
       const { error, resetPassword } = useResetPassword(); 
       const handleSubmit = async () => {
          await resetPassword(email.value)
          if(!error.value){
              context.emit('resetPassword');
          }
      }
       return { email, resetPassword, handleSubmit, error}
   }
}
</script>

<style>
    #login {
        cursor: pointer;
    }
</style>