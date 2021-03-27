<template>
  <!-- Bloc for window modal -->
  <div class="modale" v-if="revele">
    <div class="modale__overlay" v-on:click="toggleModale">
    </div>
    <!-- Modal with form and button close -->
    <div class="modalInterior">
      <button class="modalInterior__btn" v-on:click="toggleModale">
        <i class="fas fa-times fa-2x"></i>
      </button>
      <form v-if="this.$store.state.loading && !this.$store.state.successMsg" class="form" @submit.prevent="sendMsg"
      enctype="multipart/form-data">
        
        <label class="form__label" for="title">
          Titre
        </label>
        
        <input v-model="title" class="form__inputText" type="text" name="title"
        id="title" placeholder="Mon titre" autocomplete="off" required>
        
        <label  for="images" class="form__label">
          Ajouter une image
        </label>
        
        <input @change="uploadImage"
        accept="image/png,
        image/jpeg,
        image/bmp,
        image/gif" ref="file" class="form__inputFile"
         type="file" name="image" id="images" required>

        <label class="form__label" for="message">
          Votre message
        </label>

        <textarea v-model="message" id="message" class="form__inputTextarea"
        placeholder="ajoutez plusieurs lignes"
        rows="10" cols="40" minlength="10" maxlength="400" required>
        </textarea>
        <button class="form__btn" type="submit">Envoyer</button>
      </form>
      
      <div v-else-if="!this.$store.state.loading" class="loader">

      </div>
      <div class="validMsg" v-if="this.$store.state.successMsg">
        <p>Votre message a bien été enregistré</p>
        <i class="validMsg__btn--icon far fa-check-circle fa-7x"></i>
        <button v-on:click="backToHome" class="validMsg__btn" type="submit">Retour</button>
      </div>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
import {mapActions} from "vuex";

export default {
  name: 'Modale',
  data(){
    return {
      title: '',
      message: '',
      file: '',
    }
  },
  props: ['revele', 'toggleModale' ],
  methods: {
    ...mapActions(["addMessage"]),
    uploadImage(){
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    // Send form
    sendMsg(){
      this.loading = false;
      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("title", this.title);
      formData.append("message", this.message);
      formData.append("pseudo", this.$store.state.pseudo);
      this.addMessage(formData)
      this.title = '';
      this.message = '';
      this.file = '';
    },
    backToHome(){
      this.$store.state.successMsg = false;
    }
  }
}
</script>

<style lang="scss" scoped>
// Variables
@import "../assets/utils/_variables.scss";
@import "../assets/utils/_mixins.scss";

.modale{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &__overlay{
    background: rgba($color: #000000, $alpha: 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.modalInterior{
  background: #fff;
  color: #333;
  width: 320px;
  height: 425px;
  padding: 50px;
  position: fixed;
  top: 30%;
  &__btn{
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
  }
}

.form{
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  font-weight: bold;
  & ::placeholder{
    font-weight: bold;
    color: #000;
    text-indent: 0.5rem;
  }
  &__label{
    text-align: left;
    margin: 0 0 0.5rem 0;
  }
  &__inputText{
    margin: 0 0 0.5rem 0;
    border: 3px solid #d6d6d6;
    border-radius: 3px;
    height: 3rem
  }
  &__inputFile{
    margin: 0 0 0.5rem 0;

  }
  &__inputTextarea{
    border: 3px solid #d6d6d6;
    border-radius: 3px;
    resize: none;
  }
  &__btn{
    @include btn;
  }
}
.loader {
  color: $color-primary;
  font-size: 90px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  top: 40%;
  border-radius: 50%;
  margin: auto;
  position: relative;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
  animation: load6 1.7s infinite ease, round 1.7s infinite ease;
}
@-webkit-keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em,
    0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em,
    0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em,
    0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em,
    0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em,
    -0.087em -0.825em 0 -0.42em,
    -0.173em -0.812em 0 -0.44em,
    -0.256em -0.789em 0 -0.46em,
    -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em,
    -0.338em -0.758em 0 -0.42em,
    -0.555em -0.617em 0 -0.44em,
    -0.671em -0.488em 0 -0.46em,
    -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em,
    -0.377em -0.74em 0 -0.42em,
    -0.645em -0.522em 0 -0.44em,
    -0.775em -0.297em 0 -0.46em,
    -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em,
    0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em,
    0 -0.83em 0 -0.477em;
  }
}
@keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em,
    0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em,
    0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em,
    0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em,
    0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em,
    -0.087em -0.825em 0 -0.42em,
    -0.173em -0.812em 0 -0.44em,
    -0.256em -0.789em 0 -0.46em,
    -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em,
    -0.338em -0.758em 0 -0.42em,
    -0.555em -0.617em 0 -0.44em,
    -0.671em -0.488em 0 -0.46em,
    -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em,
    -0.377em -0.74em 0 -0.42em,
    -0.645em -0.522em 0 -0.44em,
    -0.775em -0.297em 0 -0.46em,
    -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em,
    0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em,
    0 -0.83em 0 -0.477em;
  }
}
@-webkit-keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.validMsg{
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  &__btn{
    @include btn;
    &--icon{
      color: #41b3a3;
    }
  }
}

</style>