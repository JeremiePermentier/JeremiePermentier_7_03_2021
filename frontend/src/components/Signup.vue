<template>
    <div class="container__table">
      <div class="table">
        <form class="form" @submit.prevent="register" novalidate="true">
        <label class="form__label" for="pseudo">Pseudo :</label>
        <input class="form__input" type="text" id="pseudo" placeholder="Pseudo" v-model="pseudo" min="4" max="10" required>
        <span v-if="errorPseudo">{{ errorPseudo }}</span>
        <label class="form__label" for="email">Email :</label>
        <input class="form__input" type="text" id="email" placeholder="Email" v-model="email" required>
        <span v-if="errorEmail">{{ errorEmail }}</span>
        <label class="form__label" for="password">Mot de passe</label>
        <input class="form__input" type="password" id="password" placeholder="Mot de passe" v-model="password" required>
        <span v-if="errorPassword">{{ errorPassword }}</span>
        <button class="form__button" type="submit" :disabled="email == false || password == false || pseudo == false">Créer un compte</button>
      </form>
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
      password: "",
      errorEmail: null,
      errorPassword: null,
      errorPseudo: null
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

    if(!this.pseudo){
      this.errorPseudo = "N'oubliez pas votre pseudo";
    } else {
      this.errorPseudo = null;
    }

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

      this.registerUser(data)
      .then(() => this.$router.push('/login'))
      .catch(err => console.log(err))
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


.form{
    display: flex;
    flex-direction: column;
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
        box-shadow: 0px 2px 0px 0px #cfcfcf;
        transform: translateY(5px);
      }
    }
    span{
      display: flex;
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
</style>