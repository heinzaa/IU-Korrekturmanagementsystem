<template>
  <div>

      <div >
        <slot />
        <button type="button" @click="$emit('close')">Close</button>
      </div>



  </div>
</template>

<script>
export default {

}
</script>

<style>


</style>