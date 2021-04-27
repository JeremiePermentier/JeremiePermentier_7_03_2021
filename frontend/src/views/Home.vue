<template>
    <div class="container__message">
      <Message></Message>
    </div>
</template>

<script>
import Message from '@/components/GetMessage.vue'

  export default {
    components: {
      Message,
    },
    data(){
      return {
        modale: false,
      }
    },
    methods:{
      toggleModale(){
        this.modale = !this.modale
      },
    }
  }
</script>
