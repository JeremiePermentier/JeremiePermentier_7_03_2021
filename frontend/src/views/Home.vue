<template>
    <div class="containerMsg">
      <button class="btnMsg" v-on:click="toggleModale">+</button>
      <Message></Message>
      <Modale :revele="revele" :toggleModale="toggleModale"></Modale>
    </div>
</template>

<script>
import Message from '@/components/getMessage.vue'
import Modale from '@/components/addMessage.vue'

  export default {
    components: {
      Message,
      Modale
    },
    data(){
      return {
        revele: false,
      }
    },
    methods:{
      toggleModale(){
        this.revele = !this.revele
      }
    }
  }
</script>