<template>
  <div>
      
         
        
        <div class="container content-small">
               <div v-if="error" class="error">Not be loaded </div>
                     <div v-if="documents">
                     <div v-for="ticket in documents" :key="ticket.id" >                        
                        <p>{{ticket.title}}</p>
                        <p>{{ticket.authorMail}}</p>
                        <p> {{ticket.Audio_Fehler[0]}} </p>
              <img :src="ticket.fileUrl" />
          </div>
      </div>
        <div>Kommentarfeld
           <textarea id="issueDescription" required disabled class="form-control" name="issueDescription" style="min-height:200px; max-height:70vh;"></textarea>
        </div>
        </div>
        

  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
export default {
    name: 'AllTickets',
    
    setup(){
        const {error, documents} = getCollection(
            'tickets',
           );
           //console.log(documents)
        return {error, documents}
    }
}
</script>

<style>
</style>