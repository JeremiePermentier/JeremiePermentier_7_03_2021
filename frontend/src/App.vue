<template>
  <div id="app">
    <div class="banner">
    <img class="banner__img" alt="logo groupomania" src="../src/assets/img/icon-left-font-monochrome-white.png">
    <div id="nav" class="nav">
      <router-link class="nav__link" v-if="hideNav()" to="/"><i class="fas fa-home"></i> </router-link>
      <router-link class="nav__link" v-if="!hideNav()" to="/signup">Inscription</router-link>
      <router-link class="nav__link" v-if="!hideNav()" to="/login">connexion </router-link>
      <router-link class="nav__link" v-if="hideNav()" to="/user"><i class="fas fa-user"></i></router-link>
      <router-link class="nav__link" v-if="hideNav() && this.$store.state.isAdmin === true" to="/admin"><i class="fas fa-user-shield"></i></router-link>
    </div>
    </div>
  <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  methods: {
    hideNav(){
      if(this.$store.state.token){
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">

// Variables 
@import "./assets/utils/_variables.scss";

body{
  height: 100%;
  margin: 0;
  padding: 0;
  background: $color-clear;
}

#app {
  font-family: 'Oxygen', sans-serif;
  color: #2c3e50;
  height: 100vh;
}
.nav{
  margin: auto 0;
  &__link{
    font-weight: bold;
    color: $color-clear;
    text-decoration: none;
    padding: 0 0.5rem;
    &.router-link-exact-active {
      color: $color-secondary;
      text-decoration: underline;
    }
  }
}
.container__table{
  display: table;
  height: 90%;
  margin: 0 auto;
  width: 100%;
  background: -webkit-linear-gradient(top, $color-primary 0%, $color-secondary 100%);
}
.table{
  display: table-cell;
  vertical-align: middle;
}
.banner{
  background: $color-primary;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  &__img{
    width: 10vh
  }
}
.containerMsg{
  margin: 4rem auto 1rem;
  text-align: center;
  max-width: 35rem;
  height: 3rem;
}
@media screen and (max-width: 800px) {
  .containerMsg{
    max-width: 330px;
  }
}
.btnMsg{
  cursor: pointer;
  width: 100%;
  height: 100%;
  border: 3px #d6d6d6 solid;
  border-radius: 4px;
  font-size: 2rem;
}

.user{
  display: flex;
  justify-content: flex-end;
}
</style>
