<template>
  <transition name="model-animation">
    <div v-show="modalActive" class="modal">
      <transition name="model-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <slot />
          <button type="button" class="btn btn-primary mt-2 me-2" @click="close"><b-icon-arrow-left-short style="font-size:1.4em; margin-top:-0.1em;"></b-icon-arrow-left-short> Zum Dashboard</button>
          <button type="button" class="btn btn-outline-secondary mt-2" @click="cancel"><b-icon-plus-circle style="font-size:1.4em; margin-top:-0.1em;"></b-icon-plus-circle> Weiteres Ticket erstellen</button>
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

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0, 0.6);
}

.modal-inner {
    position: relative;
    max-width: 640px;
    background-color: #fff;
    padding: 20px;
    margin: 0.75rem;
    text-align:center;
    border-radius: 10px;
}

.model-animation-enter-active,
.model-animation-leave-active {
    transition: opacity 1s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.model-animation-enter-from,
.model-animation-leave-to {
    opacity: 0;
}

.modal-animation-inner-enter-active {
    transition: all 1s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15;
}
.modal-animation-inner-leave-active {
    transition: all 1s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}
.modal-animation-inner-leave-to {
    transform: scale(0.8);
}

</style>