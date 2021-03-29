<template>
    <div class="dashboard">
        <div class="cardCtrl">
            <h2>Bonjour {{ this.$store.state.pseudo }}</h2>
            <button>Voir mes messages</button>
            <button>Voir mes commentaires</button>
            <button @click="logout()">Deconnexion</button> 
        </div>
        <div class="infos">
            <div class="infos__card"  v-for="info in infos" :key="info">
                <p class="infos__card--text">{{ info.message }}</p>
                <div class="ctrl">
                    <button @click="deleteMsg(info.id)" class="ctrl__btn"><i class="fas fa-trash-alt"></i></button>
                    <button class="ctrl__btn"><i class="fas fa-pen"></i></button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapActions} from "vuex";

    export default {
        name: 'profil',
        data(){
            return {
            infos: ''
            }
        },
        mounted(){
            axios.get(`http://localhost:3000/api/users/profil/${this.$store.state.userId}`)
            .then((res) => {
                console.log(res);
                this.infos = res.data.Messages;
            })
            .catch((err) => {
                console.log(err);
            })
        },
        methods: {
            ...mapActions(["deleteMessage"]),
            logout(){
                this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push('/login')
                })
            },
            deleteMsg(id){
                this.deleteMessage({id})
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../assets/utils/_variables.scss";
@import "../assets/utils/_mixins.scss";

    .dashboard, .cardCtrl, .message{
        display: flex;
        & .cardCtrl, .message{
            flex-direction: column;
        }
    }

    .dashboard{
        margin: auto;
        flex-direction: row-reverse;
    }

    .cardCtrl{
        border-radius: 4px;
        width: 200px;
        text-align: center;
        background: #d1d1d1;
        margin: 1rem;
        padding: 1rem;
        color: #000;
        & > button{
            @include btn;
        }
    }
    .infos{
        margin: 1rem auto;
        &__card {
            border: 1px solid #d1d1d1;
            border-radius: 4px;
            display: flex;
            width: 400px;
            padding: 1rem;
            margin: 0 0 1rem 0;
            justify-content: space-between;
        }
    }
    .ctrl{
        display: flex;
        align-items: center;
        &__btn{
            border: none;
            background: none;
        }
    }

</style>