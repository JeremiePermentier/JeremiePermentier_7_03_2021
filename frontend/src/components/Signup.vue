<template>
    <div class="container__table">
      <div class="table">
        <form class="form" @submit.prevent="register">
        <label class="form__label" for="pseudo">Pseudo :</label>
        <input class="form__input" type="text" id="pseudo"
        placeholder="Pseudo" v-model="pseudo" 
        minlength="4" maxlength="10"
        autocomplete="off" required>
        <label class="form__label" for="email">Email :</label>
        <input class="form__input" type="email" id="email"
        placeholder="Email" v-model="email" required>
        <label class="form__label" for="password">Mot de passe</label>
        <input class="form__input" type="password" 
        id="password" placeholder="Mot de passe" 
        v-model="password" minlength="10" maxlength="100" required>
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
      .then(() => this.$router.push('/login'))
      .catch(err => console.log(err))
    }
  }
}
</script>


<style lang="scss" scoped>

// Variables 
@import "../assets/utils/_variables.scss";
@import "../assets/utils/_mixins.scss";

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
        box-shadow: 0px 2px 0px 0px #cfcfcf;
        transform: translateY(5px);
      }
    }
    // span{
    //   @include display($dirColumn: inherit);
    //   align-items: center;
    //   justify-content: center;
    //   height: 2rem;
    //   width: 15rem;
    //   background: #fff;
    //   border: 1px solid #fff;
    //   border-radius: 3px;
    //   padding: 0;
    //   margin: 0 auto 1rem auto;
    //   font-size: 1rem;
    //   font-weight: bold;
    // }
}
</style>