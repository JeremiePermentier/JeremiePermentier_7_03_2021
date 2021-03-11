<template>
  <div class="banner">
    <img class="banner__img" alt="logo groupomania" src="../assets/icon-left-font-monochrome-white.svg">
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .banner{
    background: #091f43;
    display: flex;
    justify-content: center;
    grid-row: 1/2;
    grid-column: 1/3;
    &__img{
      width: 40vh
    }
  }
</style>
