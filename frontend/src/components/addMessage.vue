<template>
  <form @submit.prevent="addMessage">
    <label>Votre message :</label>
    <br>
    <textarea v-model="message" placeholder="ajoutez plusieurs lignes"></textarea>
    <button type="submit">Envoyer</button>
  </form>
</template>

<script>
// @ is an alias to /src

export default {


  name: 'Message',
  data(){
    return {
      message: "",
    }
  },
  methods: {
    addMessage(){
      let data = {
        message: this.message,
        userId: this.$store.user
      }
      this.$store.dispatch('addMessage', data)
    }
  }
}

</script>