<template>
    <form class="form" @submit.prevent="login">
      <label for="email">Email :</label>
      <input v-model="email" type="text" id="email" placeholder="email">
      <label for="password">Mot de passe</label>
      <input v-model="password" type="text" id="password" placeholder="mot de passe">
      <button type="submit">Login</button>
    </form>
</template>

<script>
// @ is an alias to /src
import {mapActions} from "vuex";

export default {
  name: 'Login',
  data(){
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    ...mapActions(["submitLogin"]),
    login(){
      console.log("coucou")
     let email = this.email
     let password = this.password
     //  this.$store.dispatch('login', { email, password})
      this.submitLogin({email, password})
     .then(() => this.$router.push('/'))
     .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss">

.form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    grid-row: 3;
    grid-column: 1/3;
  }
</style>