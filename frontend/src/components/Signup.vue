<template>
    <div class="container">
      <div class="container__form" v-if="this.$store.state.status != 'userCreate'">
        <form class="form" @submit.prevent="register">
          <label class="form__label" for="pseudo">Pseudo :</label>
          <input class="form__input" type="text" id="pseudo"
          placeholder="Pseudo" v-model="pseudo" 
          minlength="4" maxlength="10"
          autocomplete="off" required>
          <label class="form__label" for="email">Email :</label>
          <input class="form__input" type="email" id="email"
          placeholder="Email" v-model="email" required>
          <span class="form__span" v-if="this.$store.state.status === 'Request failed with status code 409'">L'email est déjà utilisé !</span>
          <label class="form__label" for="password">Mot de passe</label>
          <input class="form__input" type="password"
          id="password" placeholder="Mot de passe" 
          v-model="password" minlength="10" maxlength="100" required>
          <span class="form__span" v-if="this.$store.state.status === 'Request failed with status code 400'">Votre mot de passe doit contenir au minimun une majuscule et un chiffre !</span>
          <button class="form__button" type="submit" :disabled="email == false || password == false || pseudo == false">Créer un compte</button>
          <div v-if="this.$store.state.loading" class="loader"></div>
        </form>
      </div>
      <div class="container__success" v-if="this.$store.state.status === 'userCreate'">
        <div class="success__user">
          <i class="success__user--icon far fa-check-circle fa-7x"></i>
          <p class="success__user--text">Votre profil à bien été créer</p>
          <button class="success__user--button" @click="login()">Se connecter</button>
        </div>
      </div>
    </div>
</template>



<script>
// @ is an alias to /src
import {mapActions} from "vuex";

export default {
  name: 'signup',
  data(){
    return{
      pseudo: "",
      email: "",
      password: ""
    }
  },
  methods: {
    ...mapActions(["registerUser"]),
    register(){
      let data = {
        pseudo: this.pseudo,
        email: this.email,
        password: this.password
      }
      this.registerUser(data)
    },
    login(){
      this.$router.push('/login')
    }
  }
}
</script>


<style lang="scss" scoped>

// Variables 
@import "../assets/utils/_variables.scss";
@import "../assets/utils/_mixins.scss";
.container{
  display: table;
  height: 90%;
  margin: 0 auto;
  width: 100%;
  background: -webkit-linear-gradient(top, $color-primary 0%, $color-secondary 100%);
  &__form, &__success{
    display: table-cell;
    vertical-align: middle;
  }
}
.form{
  @include display;
  &__label{
    position: absolute;
    left: -9999px;
    text-indent: -9999px;
  }
  &__span{
    @include display($dirColumn: inherit);
    align-items: center;
    justify-content: center;
    color: red;
    width: 15rem;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 3px;
    padding: 0;
    margin: 0 auto 1rem auto;
    font-size: 1rem;
    font-weight: bold;
  }
  &__input, &__button{
    height: 3rem;
    width: 15rem;
    border: 1px solid #fff;
    border-radius: 3px;
    padding: 0;
    margin: 0 auto 1rem auto;
    font-size: 1rem;
    font-weight: bold;
    outline-color: $color-secondary;
  }
  &__input{
    background: rgba($color: #fff, $alpha: 0.25);
    text-align: center;
    color: #fff;
    transition: transform 300ms ease;
    position: relative;
    &::placeholder{
      color: #fff;
    }
    &:hover{
      background: rgba($color: #fff, $alpha: 0.5);
    }
    &:focus{
      background: #fff;
      color: #000;
      transform: scale(1.25);
    }
  }
  &__button{
    background: #fff;
    cursor: pointer;
    box-shadow: 0px 5px 0px 0px #cfcfcf;
    transition: 400ms;
    &:hover{
      box-shadow: 0px 3px 0px 0px #cfcfcf;
      transform: translateY(4px);
    }
    &:focus{
      box-shadow: 0px 1px 0px 0px #cfcfcf;
    }
  }
}
.success__user{
  background: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: fit-content;
  margin: auto;
  padding: 3rem;
  border-radius: 3px;
  &--icon{
    color: #41b3a3;
  }
  &--button{
    height: 3rem;
    width: 15rem;
    border: 1px solid #cfcfcf;
    border-radius: 3px;
    padding: 0;
    margin: 0 auto 1rem auto;
    font-size: 1rem;
    font-weight: bold;
    outline-color: $color-secondary;
    background: #fff;
    cursor: pointer;
    box-shadow: 0px 5px 0px 0px #cfcfcf;
    transition: 400ms;
    &:hover{
      box-shadow: 0px 3px 0px 0px #cfcfcf;
      transform: translateY(4px);
    }
    &:focus{
      box-shadow: 0px 1px 0px 0px #cfcfcf;
    }
  }
}


.loader {
  color: #fff;
  font-size: 60px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 3rem auto;
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
</style>