<template>
    <div>
        <h1>User</h1>
        <button @click="logout">Deconnexion</button>
    </div>
</template>



<script>
// @ is an alias to /src


export default {
  methods: {
        logout:function(){
            this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/login')
            })
        }
    }
}
</script>