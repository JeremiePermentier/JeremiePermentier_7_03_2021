<template>
  <div id="app">
    <Banner></Banner>
    <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/signup">s'enregistrer</router-link> |
      <router-link to="/login">connexion</router-link> |
      <router-link to="/user">Compte</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from '@/components/Banner.vue'


export default {
  components: {
    Banner
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
  text-align: center;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    display: grid;
    height: 100vh;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 5rem repeat(4, 1fr);
}
#nav {
  grid-row: 2;
  grid-column: 1/3;
  padding: 30px;
  margin: auto;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #d1515a;
    }
  }
}
label{
  text-align: initial;
}

.form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    grid-row: 2;
    grid-column: 1/3;
}
</style>
