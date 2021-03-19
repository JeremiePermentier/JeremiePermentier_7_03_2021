<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="toggleModale">

    </div>
    
    <div class="modale card">
      <button class="btn-modale btn btn-danger" v-on:click="toggleModale">
        X
      </button>
      <form class="form" @submit.prevent="addMessage">
        <label class="msg__label" for="title">Titre :</label>
        <input class="msg__input" type="text" name="title" id="title" placeholder="Mon titre">
        <label  for="img">Ajouter une image :</label>
        <input class="msg__input" type="file" name="image" id="img">
        <label class="msg__label" for="message">Votre message :</label>
        <br>
        <textarea v-model="message" id="message" placeholder="ajoutez plusieurs lignes" rows="10" cols="40" minlength="10" maxlength="400"></textarea>
        <button type="submit">Envoyer</button>
      </form>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Message',
  props: ['revele', 'toggleModale'],
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

<style lang="scss" scoped>
form{
    max-width: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
  }

.bloc-modale{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay{
  background: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.modale{
  background: #f1f1f1;
  color: #333;
  padding: 50px;
  position: fixed;
  top: 30%;
}
.btn-modale{
  position: absolute;
  top: 10px;
  right: 10px;
}


</style>