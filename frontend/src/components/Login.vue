<template>
      <div class="container">
        <div class="container__form">
          <form class="form" @submit.prevent="login" novalidate="true">
            <label class="form__label" for="email">Email :</label>
            <input class="form__input" v-model="email" type="text" id="email" placeholder="Email">
            <span v-if="errorEmail">{{ errorEmail }}</span>
            <label class="form__label" for="password">Mot de passe</label>
            <input class="form__input" v-model="password" type="password" id="password" autocomplete="current-password" placeholder="Mot de passe">
            <span v-if="errorPassword">{{ errorPassword }}</span>
            <button class="form__button" type="submit" :disabled="email == false || password == false">Valider</button>
            <div v-if="this.$store.state.loading" class="loader"></div>
          </form>
        </div>
      </div>
</template>

<script>
// @ is an alias to /src
import {mapActions} from "vuex";

export default {
  name: 'Login',
  data(){
    return {
      errors: null,
      email: null,
      password: null,
      errorEmail: null,
      errorPassword: null
    }
  },
  methods: {
    ...mapActions(["submitLogin"]),
    login(){
    let email = this.email;
    let password = this.password;
    
    if (!this.email){
      this.errorEmail = "N'oubliez pas votre email";
    } else if (!this.validEmail(this.email)){
      this.errorEmail = "Votre email ne correspond pas au format attendue";
    } else {
      this.errorEmail = null;
    }

    if(!this.password){
      this.errorPassword = "N'oubliez pas votre mot de passe";
    } else {
      this.errorPassword = null;
    }


    this.submitLogin({email, password})
    .then(() => this.$router.push('/'))
    .catch(err => this.errors = err)
    },
    validEmail(email){
      var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
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
  &__form{
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
  &__input:hover{
    background: rgba($color: #fff, $alpha: 0.5);
  }
  &__input{
    background: rgba($color: #fff, $alpha: 0.25);
    text-align: center;
    color: #fff;
    transition: transform 300ms ease;
    &::placeholder{
      color: #fff;
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
  span{
    @include display($dirColumn: inherit);
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 15rem;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 3px;
    padding: 0;
    margin: 0 auto 1rem auto;
    font-size: 1rem;
    font-weight: bold;
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