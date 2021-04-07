<template>
    <div>
        <div>
            <h1>Profil de {{ infos.pseudo }}</h1>
            <p>Adresse email {{ infos.email }}</p>
            <p>Inscrit depuis {{ infos.createdAt }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'ViewProfil',
        data(){
            return {
                infos: '',
            }
        },
        mounted(){
                axios.get(`http://localhost:3000/api/users/profil/${this.$route.params.id}`)
                .then(res => {
                    this.infos = res.data;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
</script>

<style lang="scss" scoped>

</style>