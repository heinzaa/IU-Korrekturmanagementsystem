<template>
  <div>
      <p>Hallo du Mongo</p>
      <div v-if="error" class="error">Not be loaded </div>
      <div v-if="documents">
          <div v-for="ticket in documents" :key="ticket.id" >
              {{ticket.title}}
              <img :src="ticket.fileUrl" />
          </div>
      </div>

  </div>
</template>

<script>
import getCollection from '../composables/getCollection'

export default {
    name: 'allTickets',
    setup(){
        const {error, documents} = getCollection('tickets');

        return {error, documents}
    }
}
</script>

<style>

</style>