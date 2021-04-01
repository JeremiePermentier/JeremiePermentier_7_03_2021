<template>
    <div class="dashboard">
        <div class="tab">
            <button @click="seeInfo('message')">Voir mes messages</button>
            <button  @click="seeInfo('comment')">Voir mes commentaires</button>
            <button  @click="seeInfo()">Compte</button>
            <div v-if="compte" class="infos">
                <div class="infos__card"  v-for="info in infos" :key="info.message">
                    <p class="infos__card--text">{{ info.title || info.comment }}</p>
                    <div class="ctrl">
                        <button @click="deleteInfo(info)" class="ctrl__btn"><i class="fas fa-trash-alt"></i></button>
                        <button class="ctrl__btn"><i class="fas fa-pen"></i></button>
                    </div>
                </div>
            </div>
            <div v-else class="profil">
                <label for="pseudo">Pseudo</label>
                <input type="text" name="pseudo" id="pseudo" :value="infos.pseudo" autocomplete="off">
                
                <label for="email">Email</label>
                <input type="email" name="email" id="email" :value="infos.email">

                <input type="file" name="avatar" id="avatar" :value="infos.avatar">

                <label for="bio">Bio</label>
                <textarea name="bio" id="bio" cols="30" rows="10" :value="infos.bio" placeholder="Ajouter votre bio"></textarea>

                <input type="submit" value="Sauvegarder les changements">

            </div>
        </div>
            <!-- <div class="cardCtrl">
                <h2>Bonjour {{ this.$store.state.pseudo }}</h2>
                <button @click="seeInfo('message')">Voir mes messages</button>
                <button  @click="seeInfo('comment')">Voir mes commentaires</button>
                <button @click="logout()">Deconnexion</button> 
            </div>
            <div v-if="title" class="infos">
                <h2>{{ title }}</h2>
                <div class="infos__card"  v-for="info in infos" :key="info.message">
                    <p class="infos__card--text">{{ info.title || info.comment }}</p>
                    <div class="ctrl">
                        <button @click="deleteInfo(info)" class="ctrl__btn"><i class="fas fa-trash-alt"></i></button>
                        <button class="ctrl__btn"><i class="fas fa-pen"></i></button>
                    </div>
                </div>
            </div> -->
        <div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'profil',
        data(){
            return {
                infos: '',
                userId: this.$store.state.userId,
                compte: ""
            }
        },
        methods: {
            logout(){
                this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push('/login')
                })
            },
            seeInfo(info){
                axios.get(`http://localhost:3000/api/users/profil/${this.userId}`)
                .then((res) => {
                    if (info === 'message'){
                        this.infos = res.data.Messages;
                        this.compte = true;
                    } else if (info === 'comment'){
                        this.infos = res.data.Comments;
                        this.compte = true;
                    } else {
                        this.infos = res.data;
                        this.compte = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            deleteInfo(deleteInfo){
                if(deleteInfo.message){
                    axios.delete(`http://localhost:3000/api/message/${deleteInfo.id}`)
                    .then(() => {
                        console.log(deleteInfo)
                        this.refresh();
                    })
                    .catch((err) => console.log(err))
                } else {
                    axios.delete(`http://localhost:3000/api/comment/${deleteInfo.id}`)
                    .then(() => {
                        console.log(deleteInfo)
                        this.refresh();
                    })
                    .catch((err) => console.log(err))
                }
               
            },
            refresh(){
                axios.get(`http://localhost:3000/api/users/profil/${this.$store.state.userId}`)
                .then((res) => {
                    this.infos = res.data.Messages;
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../assets/utils/_variables.scss";
@import "../assets/utils/_mixins.scss";

.dashboard{
    @include display($dirColumn: row-reverse);
    margin: 6rem auto;
}
.cardCtrl, .message{
    @include display;
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
    // @include display($dirColumn: column-reverse);
    width: 450px;
    &__card {
        @include display($dirColumn: inherit);
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        padding: 1rem;
        margin: 0 0 1rem 0;
        justify-content: space-between;
    }
}
.ctrl{
    @include display($dirColumn: inherit);
    align-items: center;
    &__btn{
        border: none;
        background: none;
    }
}


.tab{
    margin: auto;
    padding: 1rem;
    height: 60vh;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
        & > button{
            @include btn( $background: grey, $border: grey, $margin: 0);
            &:hover{
                background: $color-primary;
            }
            &.active{
                background: $color-primary;
            }
    }
}
.profil{
    @include display;
}
</style>