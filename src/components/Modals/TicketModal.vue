<template>
  <transition name="model-animation">
    <div v-show="modalActive" class="modal">
      <transition name="model-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <slot />
          <button @click="close">Verstanden</button>
          <button @click="cancel">Schließen</button>
        </div>
      </transition>
    </div>
  </transition>


</template>

<script>
export default {
  props: ["modalActive"],
  setup(props, {emit}){

    const close = () => {
      emit('close');
    }
    const cancel = () =>{
      emit('cancel');
    }

    return {close, cancel}
    
  }

}
</script>

<style  scoped>

.modal{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255,255,255, 0.7);
}

.modal-inner{
  position: relative;
  max-width: 640px;
  width: 80%;
  background-color: #fff;
  padding: 64px 16px;
}

.model-animation-enter-active,
.model-animation-leave-active{

  transition: opacity 3s cubic-bezier(.52, .02, .19, 1.02);

}

.model-animation-enter-from, .model-animation-leave-to{
  opacity: 0;
}

.modal-animation-inner-enter-active{
  transition: all 3s cubic-bezier(.52, .02, .19, 1.02) 0.15;
}
.modal-animation-inner-leave-active{
  transition: all 3s cubic-bezier(.52, .02, .19, 1.02);
}
.modal-animation-inner-enter-from{
  opacity: 0;
  transform: scale(0.8);
}
.modal-animation-inner-leave-to{  
  transform: scale(0.8);
}


</style>