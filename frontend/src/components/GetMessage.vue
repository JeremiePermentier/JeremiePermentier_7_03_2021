<template>
<div>
	<button  class="btnMsg" v-on:click="toggleModale">+</button>

  <div v-for="info in infos" :key="info.message">
    <div class="msg">
      <div @click="getOnMsg(info.id)" class="msg__container">
          <img class="msg__container--img" :src="info.imageUrl" alt="">
      </div>
      <div class="msg__card">
        <div class="msg__title">
          <h2 class="msg__title" @click="getOnMsg(info.id)">{{ info.title }}</h2>
        </div>
        <div class="msg__info">
          <div>
            <p>
              Publié par {{info.pseudo}}
              <br/>
              le {{date(info.createdAt)}}
            </p>
          </div>
          <div class="msg__interaction">
            <p class="msg__interaction--comment">
              {{ info.Comments.length }} Commentaire
              <span v-if="info.Comments.length > 1">s</span>
            </p>
            <p class="msg__interaction--like">
              {{ info.Likes.length }} Like
              <span v-if="info.Likes.length > 1">s</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr>
  </div>
	<div v-if="modale" class="modale">
		<div class="modale__overlay" v-on:click="toggleModale"></div>
		<div class="modalInterior">
			<button class="modalInterior__btn" v-on:click="toggleModale"><i class="fas fa-times fa-2x"></i></button>
			<form v-if="!this.$store.state.loading && !this.$store.state.successMsg" class="form" @submit.prevent="sendMsg" enctype="multipart/form-data">
				<label class="form__label" for="title">Titre</label>
				<input v-model="title" class="form__inputText" type="text" name="title" id="title" placeholder="Mon titre" autocomplete="off" minlength="3" maxlength="25">
				<label  for="images" class="form__label">Ajouter une image</label>
				<input @change="uploadImage" accept="image/png,image/jpeg,image/bmp" ref="file" class="form__inputFile" type="file" name="image" id="images">
				<label class="form__label" for="message">Votre message</label>
				<textarea v-model="message" id="message" class="form__inputTextarea" placeholder="ajoutez plusieurs lignes" rows="10" cols="40" minlength="10" maxlength="400"></textarea>
				<button class="form__btn" type="submit">Envoyer</button>
			</form>
			<div v-else-if="this.$store.state.loading" class="loader"></div>
			<div class="validMsg" v-if="this.$store.state.successMsg">
				<p>
					Votre message a bien été enregistré
				</p>
				<i class="validMsg__btn--icon far fa-check-circle fa-7x"></i>
				<button v-on:click="toggleModale" class="validMsg__btn" type="submit">Retour</button>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import {mapActions} from "vuex";
import axios from 'axios';

export default {
    name: 'Message',
    data(){
        return{
            infos: this.$store.state.infos,
            userId: this.$store.state.userId,
            update: false,
            title: '',
            message: '',
            file: '',
            modale: false
        }
    },
    mounted(){
        axios.get('http://localhost:3000/api/message')
        .then(res => {
            this.infos = res.data
        })
        .catch(error => console.log(error))
    },
    methods: {
        ...mapActions(["addMessage", "getAllMessage"]),
        toggleModale(){
            if(this.modale === false){
                this.modale = true
            } else {
                this.modale = false
                this.refresh()
                this.$store.state.successMsg = false;
            }
        },
        date(date){
            let formatDate = new Date(date);
            return formatDate.toLocaleString('fr-FR')
        },
        getOnMsg(id){
            this.$router.push(`message/${id}`)
        },
        uploadImage(){
            const file = this.$refs.file.files[0];
            this.file = file;
        },
        sendMsg(){
          this.loading = false;
          const formData = new FormData();
          formData.append("image", this.file);
          formData.append("title", this.title);
          formData.append("message", this.message);
          formData.append("pseudo", this.$store.state.pseudo);
          this.addMessage(formData)
          this.title = '';
          this.message = '';
          this.file = '';
        },
        refresh(){
            axios.get('http://localhost:3000/api/message')
            .then(res => {
                this.infos = res.data
            })
            .catch(error => console.log(error))
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/utils/_variables.scss";
@import "../assets/utils/_mixins.scss";

.msg{
    margin: 2rem 0;
    border-bottom: 1px solid $color-text;
    text-align: left;
    position: relative;
    border: 1px solid;
    border-radius: 4px;
    box-shadow: 3px 3px 6px $color-text;
    &__title{
        color: #000;
        display: inline-block;
        cursor: pointer;
        &:hover{
            color: $color-primary;
            text-decoration: underline;
            text-decoration-color: $color-primary;
        }
    }
    &__container{
        cursor: pointer;
        &--img{
            max-width: 100%;
            width: max-content;
            max-height: 100%;
            height: 30vh;
            object-fit: cover;
            border-radius: 4px 4px 0 0;
        }
    }
    &__card{
        padding: 1rem;
        margin: 0.5rem;
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        background: #fff;
    }
    &__info, &__interaction{
        display: flex;
        justify-content: space-between;
        &--like, &--comment{
            margin: 1rem;
        }
    }
}

.modale{
  @include display($dirColumn: inherit);
  justify-content: center;
  align-items: center;
  &__overlay{
    background: rgba($color: $color-text, $alpha: 0.5);
    @include position;
  }
}
.modalInterior{
  background: $color-clear;
  color: $color-text;
  width: 320px;
  height: 425px;
  padding: 50px;
  @include position(
    $top: 30%,
    $right: inherit,
    $bottom: inherit,
    $left: inherit
  );
  &__btn{
    @include position(
    $position: absolute, 
    $top: 10px,
    $right: 10px,
    $bottom: inherit,
    $left: inherit
  );
    background: none;
    border: none;
    cursor: pointer;
  }
}

.form{
  @include display;
  max-width: 400px;
  margin: auto;
  font-size: 1.25rem;
  font-weight: bold;
  & ::placeholder{
    font-weight: bold;
    color: $color-text;
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
.loader {
  @include position(
    $position: relative, 
    $top: 40%,
    $right: inherit,
    $bottom: inherit,
    $left: inherit
  );
  color: $color-primary;
  font-size: 90px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: auto;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
  animation: load6 1.7s infinite ease, round 1.7s infinite ease;
}
@-webkit-keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em,
    0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em,
    0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em,
    0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em,
    0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em,
    -0.087em -0.825em 0 -0.42em,
    -0.173em -0.812em 0 -0.44em,
    -0.256em -0.789em 0 -0.46em,
    -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em,
    -0.338em -0.758em 0 -0.42em,
    -0.555em -0.617em 0 -0.44em,
    -0.671em -0.488em 0 -0.46em,
    -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em,
    -0.377em -0.74em 0 -0.42em,
    -0.645em -0.522em 0 -0.44em,
    -0.775em -0.297em 0 -0.46em,
    -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em,
    0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em,
    0 -0.83em 0 -0.477em;
  }
}
@keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em,
    0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em,
    0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em,
    0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em,
    0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em,
    -0.087em -0.825em 0 -0.42em,
    -0.173em -0.812em 0 -0.44em,
    -0.256em -0.789em 0 -0.46em,
    -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em,
    -0.338em -0.758em 0 -0.42em,
    -0.555em -0.617em 0 -0.44em,
    -0.671em -0.488em 0 -0.46em,
    -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em,
    -0.377em -0.74em 0 -0.42em,
    -0.645em -0.522em 0 -0.44em,
    -0.775em -0.297em 0 -0.46em,
    -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em,
    0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em,
    0 -0.83em 0 -0.477em;
  }
}
@-webkit-keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.validMsg{
  @include display;
  height: 100%;
  justify-content: space-around;
  &__btn{
    @include btn;
    &--icon{
      color: $color-success;
    }
  }
}

@media screen and (max-width: 800px) {
  .msg__info{
    display: flex;
    flex-direction: column;
  }
  .modalInterior{
    width: 250px;
    top: 15%;
  }
}

</style>