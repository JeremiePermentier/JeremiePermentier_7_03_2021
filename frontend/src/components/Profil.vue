<template>
    <div class="dashboard">
        <div class="tab">
            <button class="tab__button" @click="seeInfo('message')">Mes messages</button>
            <button class="tab__button" @click="seeInfo('comment')">Mes commentaires</button>
            <button class="tab__button" @click="seeInfo()">Compte</button>
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
                <form class="form" @submit.prevent="updateUser" enctype="multipart/form-data">
                    <label class="form__label" for="pseudo">Pseudo</label>
                    <input class="form__inputText" type="text" name="pseudo" id="pseudo" v-model="pseudo" placeholder="modifier mon pseudo" autocomplete="off">

                    <input  @change="uploadImage"
                    accept="image/png,
                    image/jpeg" ref="file" class="form__inputFile"
                    type="file" name="avatar" id="avatar">

                    <label class="form__label" for="bio">Bio</label>
                    <textarea class="form__inputTextarea" name="bio" id="bio" cols="30" rows="10" v-model="bio" placeholder="Ajouter votre bio"></textarea>

                    <input class="form__btn" type="submit" value="Sauvegarder les changements">
                </form>
            </div>
        </div>
        <div class="dashboard__container">
            <button class="dashboard__container--button" @click="logout()">Deconnexion</button>
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
                compte: "",
                pseudo: "",
                file: "",
                bio: "",
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
                }
               
            },
            uploadImage(){
            const file = this.$refs.file.files[0];
            this.file = file;
            },
            updateUser(){
                const formData = new FormData();
                formData.append("pseudo", this.pseudo);
                formData.append("image", this.file);
                formData.append("bio", this.bio);
                axios({
                    method: "put",
                    url: `http://localhost:3000/api/users/profil/${this.$store.state.userId}`,
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" }
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
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
    margin: 6rem auto;
    &__container{
        text-align: center;
        margin: auto;
        &--button{
         @include btn($border-radius: 0);
         width: 10rem;
        }
    }
}
.tab{
    margin: auto;
    padding: 1rem;
    height: 60vh;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
        &__button{
            @include btn( $background: grey, $border: grey, $margin: 0, $border-radius: 0);
            width: 10rem;
            &:hover{
                background: $color-primary;
            }
            &:focus{
                background: $color-primary;
            }
    }
    &__active{
        background: $color-primary;
    }
}
.infos{
    margin: 1rem auto;
    width: 450px;
    height: 500px;
    overflow: overlay;
    &__card {
        @include display($dirColumn: inherit);
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        padding: 1rem;
        margin: 1rem;
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
.profil{
    margin: 1rem auto;
    width: 300px;
    height: 500px;
    // & > form{
    //     @include display;
    //     height: 94%;
    //     justify-content: center;
    // }
}


.form{
  @include display;
  max-width: 400px;
  margin: auto;
  font-size: 1.25rem;
  font-weight: bold;
  & ::placeholder{
    font-weight: bold;
    color: #000;
    text-indent: 0.5rem;
  }
  &__label{
    text-align: left;
    margin: 0 0 0.5rem 0;
  }
  &__inputText{
    margin: 0 0 0.5rem 0;
    border: 3px solid #d6d6d6;
    border-radius: 3px;
    height: 3rem
  }
  &__inputFile{
    margin: 0 0 0.5rem 0;

  }
  &__inputTextarea{
    border: 3px solid #d6d6d6;
    border-radius: 3px;
    resize: none;
  }
  &__btn{
    @include btn;
  }
}
</style>