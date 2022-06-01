<template>
  <div id="VerificationPopUp">
      <div>
         <h1> Verfiziere deine Email</h1> 
            <p>Du musst deine Email verfizieren, um deine Registrierung abzuschließen</p>
            <img />
        <small>
            Eine Email mit Verfizierungslink wurde an ihre {{email}} gesendet. Bitte bestätigen Sie diese.
        </small>

        <button type="button" @click="toLogin" class="btn btn-primary">Zum Login</button>

      </div>
    </div>
</template>

<script>

export default {
 setup(props, context){
       
   

      const toLogin = () => {
          context.emit('toLoginComponent');
      }
       
     return { toLogin }
    
}    
}


</script>

<style>

</style>