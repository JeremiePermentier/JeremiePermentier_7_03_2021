<template>
    <div class="container">
        <button class="back" @click="back()"><i class="fas fa-arrow-left"></i></button>
        <div class="card">
            <img v-if="infos.avatar" class="card__avatar" :src="infos.avatar" :alt="infos.pseudo">
            <h1 class="card__title">Profil de {{ infos.pseudo }}</h1>
            <p class="card__text"><i class="fas fa-envelope"></i> : {{ infos.email }}</p>
            <p class="card__text"><span>Inscription :</span> <br/>{{ date(infos.createdAt) }}</p>
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
        },
        methods: {
            back(){
                this.$router.push(`/admin`)
            },
            date(date){
                let formatDate = new Date(date);
                return formatDate.toLocaleString('fr-FR')
            },
        }
    }
</script>

<style lang="scss" scoped>

.container{
    max-width: 400px;
    height: 100%;
    margin: 5rem auto 0 auto;
    display: flex;
    justify-content: center;
}
.back{
    border: 1px solid;
    border-radius: 50%;
    margin: 0 1rem 0 0;
    height: 2rem;
    width: 2rem;
}
.card{
    border: 1px solid #d1d1d1;
    padding: 1rem;
    width: 30vw;
    height: 35vh;
    text-align: center;
    border-radius: 5px;
    &__avatar{
        width: 10vw;
        vertical-align: middle;
        height: 10vh;
        object-fit: cover;
        border-radius: 50%;
    }
    &__text{
        text-align: left;
        & > span {
            font-weight: bold;
            line-height: 2rem;
        }
    }
}
</style>