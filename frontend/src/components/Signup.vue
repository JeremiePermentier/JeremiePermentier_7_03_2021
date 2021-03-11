<template>
    <form class="form" @submit.prevent="register">
    <label for="pseudo">Pseudo :</label>
    <input type="text" id="pseudo" placeholder="pseudo" v-model="pseudo" required autofocus>
    <label for="email">Email :</label>
    <input type="text" id="email" placeholder="email" v-model="email" required>
    <label for="password">Mot de passe</label>
    <input type="text" id="password" placeholder="mot de passe" v-model="password" required>
    <button type="submit">s'enregister</button>
  </form>
</template>



<script>
// @ is an alias to /src

export default {
  data(){
    return{
      pseudo: "",
      email: "",
      password: ""
    }
  },
  methods: {
    register(){
      let data = {
        pseudo: this.pseudo,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', data)
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