<template>
    <div class="getOneMsg">
        <div class="msg container">
            <div class="msg__container">
                <img :src="message.imageUrl" alt="" class="msg__container--img">
            </div>
            <div class="msg__card">
                <div>
                    <h2 class="msg__title">{{ message.title }}</h2>
                    <p class="msg__text">{{ message.message }}</p>
                </div>
                <div class="msg__info">
                <div>
                    <p>Publié par {{ message.pseudo }}<br/>
                    le {{ date(message.createdAt) }}</p>
                </div>
                <div class="msg__interaction">
                    <p class="msg__interaction--comment">{{ count(comments) }} <i class="far fa-comment"></i></p>
                    <p class="msg__interaction--like" @click="likeOrDislike('like')">{{ count(likes) }}
                        <button>
                            <i v-if="!likeOrNolike('Like')" class="far fa-thumbs-up"></i>
                            <i v-else-if="likeOrNolike('Like')" class="fas fa-thumbs-up"></i>
                        </button>
                    </p>
                    <p class="msg__interaction--like" @click="likeOrDislike('dislike')">
                        {{ count(dislikes) }}
                        <button>
                            <i v-if="!likeOrNolike('Dislike')" class="far fa-thumbs-down"></i>
                            <i v-if="likeOrNolike('Dislike')" class="fas fa-thumbs-down"></i>
                        </button>
                    </p>
                </div>
            </div>
            </div>
            <div class="msg__ctrl">
                <button class="msg__ctrl--delete" v-if="message.userId == userId || this.$store.state.isAdmin == true" @click="deleteRequest(`message/${message.id}`, 'message')"><i class="fas fa-trash-alt"></i></button>
                <button class="msg__ctrl--update" v-if="message.userId == userId || this.$store.state.isAdmin == true" @click="updateMessage(message.comment)"><i class="fas fa-pen"></i></button>
            </div>
        </div>
        <div class="comment container">
            <p class="comment__avatar">
                {{ this.$store.state.pseudo[0] }}
            </p>
            <form  v-if="!this.$store.state.loading && !this.$store.state.successMsg" class="comment__ctrl" @submit.prevent="addComment">
                <textarea name="comment" v-model="comment" placeholder="Écrire un commentaire..." class="comment__ctrl--textarea" id="comment"
                 cols="50" rows="6" minlength="10" maxlength="300" required></textarea>
                <div class="comment__ctrl--btn">
                    <button class="send" >Envoyer</button>    
                </div> 
            </form>
            <div v-else-if="this.$store.state.loading" class="loader"></div>
            <div class="validComment" v-if="this.$store.state.successMsg">
                <p>Votre message a bien été enregistré</p>
                <button v-on:click="backToHome" class="validComment__btn" type="submit">Retour</button>
            </div>
        </div>
        <div class="commentUser container" v-for="comment in comments" :key="comment.comments">
            <p class="comment__avatar">{{ comment.User.pseudo[0] }}</p>
            <div class="commentUser__container">
                <p class="commentUser__text">{{ comment.comment }}</p>
                <div class="commentUser__ctrl" >
                    <button @click="likeOrDislikeComment(comment.id, 'like')">{{ counterLikeAndDislikeComment(comment.id, "LikeComment") }}
                        <i v-if="userLikeAndDislikeComment(comment.id, 'Like')" class="fas fa-thumbs-up"></i>
                        <i v-if="!userLikeAndDislikeComment(comment.id, 'Like')"  class="far fa-thumbs-up"></i>
                    </button>
                    <button @click="likeOrDislikeComment(comment.id, 'dislike')">{{ counterLikeAndDislikeComment(comment.id, "DislikeComment") }}
                        <i v-if="userLikeAndDislikeComment(comment.id, 'Dislike')"  class="fas fa-thumbs-down"></i>
                         <i v-if="!userLikeAndDislikeComment(comment.id, 'Dislike')"  class="far fa-thumbs-down"></i>
                    </button>
                    <button v-if="comment.userId === userId" @click="toggleComment(comment.id)"><i title="Modifier le commentaire" class="fas fa-pen"></i></button>
                    <button v-if="comment.userId === userId" @click="deleteRequest(`comment/${comment.id}`, 'comment')" ><i title="Supprimer le commentaire" class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
        <div v-if="modale" class="modale">
            <div class="modale__overlay">
                <div class="modalInterior">
                    <button class="modalInterior__btn" v-on:click="toggleComment">
                        <i class="fas fa-times fa-2x"></i>
                    </button>
                    <form v-if="!this.$store.state.loading && !this.$store.state.successMsg" class="formModal" @submit.prevent="(updateComment())"
                    enctype="multipart/form-data">
                        
                        <label class="formModal__label" for="message">
                        Votre message
                        </label>

                        <textarea v-model="comment" id="message" class="formModal__inputTextarea"
                        placeholder="ajoutez plusieurs lignes"
                        rows="10" cols="40" minlength="10" maxlength="400" required>
                        </textarea>
                        <button class="formModal__btn" type="submit">Envoyer</button>
                    </form>
                    <div v-else-if="this.$store.state.loading" class="loader"></div>

                    <div class="validMsg" v-if="this.$store.state.successMsg">
                        <p>Votre message a bien été enregistré</p>
                        <i class="validMsg__btn--icon far fa-check-circle fa-7x"></i>
                        <button v-on:click="backToHome" class="validMsg__btn" type="submit">Retour</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="update" class="modale">
            <div class="modale__overlay">
                <div class="modalInterior">
                    <button class="modalInterior__btn" v-on:click="updateMessage()">
                        <i class="fas fa-times fa-2x"></i>
                    </button>
                    <form v-if="!this.$store.state.loading && !this.$store.state.successMsg" class="form" @submit.prevent="sendUpdateMessage()"
                        enctype="multipart/form-data">
                        <label class="form__label" for="title">Titre</label>
                        <input class="form__inputText" v-model="title" type="text" name="title"
                        id="title" placeholder="Mon titre"
                        autocomplete="off"  minlength="3" maxlength="25">

                        <label class="form__label" for="images">
                            Ajouter une image
                        </label>

                        <input @change="uploadImage"
                        accept="image/png,
                        image/jpeg,
                        image/bmp,
                        image/gif" ref="file" class="form__inputFile"
                        type="file" name="image" id="images">

                        <label class="form__label" for="message">
                        Votre message
                        </label>

                        <textarea v-model="messageTextarea" id="message" class="form__inputTextarea"
                        placeholder="ajoutez plusieurs lignes"
                        rows="10" cols="40" minlength="10" maxlength="400">
                        </textarea>

                        <button class="form__btn" type="submit">Envoyer</button>
                    </form>

                    <div v-else-if="this.$store.state.loading" class="loader"></div>

                    <div class="validMsg" v-if="this.$store.state.successMsg">
                        <p>Votre message a bien été enregistré</p>
                        <i class="validMsg__btn--icon far fa-check-circle fa-7x"></i>
                        <button v-on:click="backToHome()" class="validMsg__btn" type="submit">Retour</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapActions} from "vuex";

    export default {
        name: 'GetOneMessage',
        data(){
            return{
                message: "",
                comments: "",
                comment: "",
                likes: "",
                dislikes: "",
                likesComments: "",
                dislikesComments: "",
                userId: this.$store.state.userId,
                idComment: "",
                file: "",
                title: "",
                messageTextarea: "",
                update: false,
                modale: false,
                error: null
            }
        },
        mounted(){
            axios.get('http://localhost:3000/api/message/' + this.$route.params.id)
            .then(res => {
                this.message = res.data
                this.comments = res.data.Comments
                this.likes = res.data.Likes
                this.dislikes = res.data.Dislikes
            })
            .catch(error => this.error = error.response.status)

            axios.get('http://localhost:3000/api/comment/likecomment')
            .then(res => {
                this.likesComments = res.data
            })
            .catch(error => this.error = error.response.status)

            axios.get('http://localhost:3000/api/comment/dislikecomment')
            .then(res => {
                this.dislikesComments = res.data
            })
            .catch(error => this.error = error.response.status)
        },
        methods:{
            ...mapActions([
                "addComment", 
                "sendMessage",
                "sendComment",
                "sendUpdateComment",
                "deleteComment"
                ]),
            toggleComment(id){
                if(this.modale === true){
                    this.modale = false
                } else {
                    this.modale = true
                    this.idComment = id
                }
            },
            date(date){
                let formatDate = new Date(date);
                return formatDate.toLocaleString('fr-FR')
            },
            likeOrDislike(url){
                axios({url: `http://localhost:3000/api/${url}/` + this.$route.params.id, method: 'POST'})
                .then(() => {
                    this.refresh(`message/${this.message.id}`, 'message')
                })
                .catch(error => this.error = error.response.status)
            },
            likeOrDislikeComment(id, url){
                axios({url: `http://localhost:3000/api/comment/${url}/` + id, method: 'POST'})
                .then(() => {
                    this.refresh(`comment/likecomment`, 'likeComment')
                    this.refresh(`comment/dislikecomment`, 'disLikeComment')
                })
                .catch(error => this.error = error.response.status)
            },
            count(valueToCalculate){
                let count = 0;

                if(valueToCalculate.length > count){
                    return valueToCalculate.length
                } else {
                    return count
                }
            },
            counterLikeAndDislikeComment(id, valueToCalculate){
                let count = 0;

                if(valueToCalculate === "LikeComment"){
                    if (this.likesComments.length > 0){
                        for (let i = 0; i < this.likesComments.length; i++){
                            if (id === this.likesComments[i].commentId){
                                count++
                            }
                        }
                        return count
                        } else {
                            return count
                    }
                } else if (valueToCalculate === "DislikeComment") {
                    if (this.dislikesComments.length > 0){
                        for (let i = 0; i < this.dislikesComments.length; i++){
                            if (id === this.dislikesComments[i].commentId){
                                count++
                            }
                        }
                        return count
                    } else {
                        return count
                    }
                }
            },
            userLikeAndDislikeComment(commentId, valueToCalculate){
                let test;
                if(valueToCalculate === "Like"){
                    test = this.likesComments;
                } else if (valueToCalculate === "Dislike"){
                    test = this.dislikesComments;
                }
                for (let i = 0 ; i < test.length; i++){
                    if(test[i].commentId === commentId && test[i].userId === this.userId){
                        return true 
                    }
                }
            },
            likeOrNolike(likeOrDislike){
                if(likeOrDislike === "Like"){
                    for (let i = 0 ; i < this.likes.length; i++){
                        const userIdLike  = this.likes[i].userId
                        if( userIdLike == this.userId){
                            return true
                        }
                    }
                } else if (likeOrDislike === "Dislike"){
                    for (let i = 0 ; i < this.dislikes.length; i++){
                        const userIdLike  = this.dislikes[i].userId
                        if( userIdLike == this.userId){
                            return true
                        }
                    }
                }
            },
            addComment(){
                let data = {
                    id: this.$route.params.id,
                    comment: this.comment
                }
                this.sendComment(data)
                this.comment = ""
                this.refresh(`message/${this.message.id}`, 'message')
            },
            uploadImage(){
                const file = this.$refs.file.files[0];
                this.file = file;
            },
            sendUpdateMessage(){
                const formData = new FormData();
                formData.append("id", this.$route.params.id)
                formData.append("image", this.file);
                formData.append("title", this.title);
                formData.append("message", this.messageTextarea);

                this.sendMessage(formData)

                this.title = '';
                this.messageTextarea = '';
                this.file = '';
            },
            backToHome(){
                this.$store.state.successMsg = false;
                this.refresh(`message/${this.message.id}`, 'message')
            },
            updateComment(){

                let data = {
                    id: this.idComment,
                    comment: this.comment
                }
                this.sendUpdateComment(data)
                this.comment = ''
            },
            deleteRequest(url, request){
                axios.delete(`http://localhost:3000/api/${url}`)
                .then(() => {
                    if(request === "comment"){
                        this.refresh(`message/${this.message.id}`, 'message')
                    } else if (request === "message") {
                        this.$router.push('/')
                    }
                })
                .catch(error => this.error = error.response.status)
            },
            updateMessage(){
                if(this.update === false){
                    this.update = true;
                } else {
                    this.update = false;
                }
            },
            refresh(url, request){

                axios.get(`http://localhost:3000/api/${url}`)
                .then(res => {
                    if(request === "message"){
                        this.message = res.data
                        this.comments = res.data.Comments
                        this.likes = res.data.Likes
                        this.dislikes = res.data.Dislikes
                    } else if (request === "likeComment"){
                        this.likesComments = res.data
                    } else if (request === "disLikeComment"){
                        this.dislikesComments = res.data
                    }
                })
                .catch(error => this.error = error.response.status)
            },
        }
    }
</script>

<style lang="scss" scoped>
@import "../assets/utils/_variables.scss";
@import "../assets/utils/_mixins.scss";

.container{
    max-width: 500px;
    margin: 2rem auto;
}

.msg{
    text-align: left;
    position: relative;
    border: 1px solid;
    border-radius: 4px;
    box-shadow: 3px 3px 6px $color-text;
    &__title{
        color: $color-text;
        display: inline-block;
    }
    &__container{
        height: 35vh;
        &--img{
            max-width: 100%;
            width: max-content;
            max-height: 100%;
            object-fit: cover;
            border-radius: 4px 4px 0 0;
        }
    }
    &__card{
        padding: 1rem;
        margin: 0.5rem;
        border: 1px solid #d1d1d1;
        border-radius: 4px;
        background: $color-clear;
    }
    &__info, &__interaction{
        @include display($dirColumn: inherit);
        justify-content: space-between;
        &--like, &--comment{
            margin: 1rem;
        }
        &--like > button{
            border: none;
            background: none;
            cursor: pointer;
        }
    }
    &__ctrl{
        display: flex;
        border-radius: 0 0 4px 4px;
        &--delete{
            background: $color-secondary;
            cursor: pointer;
        }
        &--update{
            background: $color-primary;
            cursor: pointer;
        }
        & > button {
            color: $color-clear;
            border: none;
            width: 100%;
            padding: 0.5rem;
        }
    }
}

.comment{
    @include display($dirColumn: inherit);
    justify-content: space-between;
    &__avatar{
        @include display($dirColumn: inherit);
        justify-content: center;
        align-items: center;
        margin: 0;
        background: $color-text;
        border-radius: 100%;
        width: 3rem;
        max-height: 3rem;
        color: #fff;
        font-weight: bold;
    }
    &__ctrl{
        display: grid;
    }
    &__ctrl--textarea{
        resize: none;
        border: 1.5px solid #d6d6d6;
        border-radius: 4px 4px 0 0;
    }
    &__ctrl--btn{
        border-left: 1.5px solid #d6d6d6;
        border-bottom: 1.5px solid #d6d6d6;
        border-right: 1.5px solid #d6d6d6;
        text-align: right;
        border-radius: 0 0 4px 4px;
    }
}
.send, .cancel{
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        border: 1px solid;
        padding: 0.5rem;
        margin: 0.25rem;
        cursor: pointer;
    }
.send{
    border-color: $color-primary;
    background: $color-primary;
    color: #fff;
}
.cancel{
    border-color: #d1d1d1;
    background: #d1d1d1;
}
.commentUser{
    margin: 1rem auto;
    @include display($dirColumn: inherit);
    justify-content: space-between;
    &__container{
        width: 85%;
        margin: 0 0 0 1rem;
    }
    &__text{
        text-align: left;
        margin: 0;
        height: 100px;
        padding: 0.5rem;
        border: 1.5px solid #d1d1d1;
        border-radius: 4px 4px 0 0;
        word-break: break-word;
    }
    &__ctrl{
        text-align: right;
        margin: 0;
        padding: 0.5rem;
        border: 1.5px solid #d1d1d1;
        border-radius: 0 0 4px 4px;
        & > button{
            margin: 0 0.5rem;
            background: #fff;
            color: $color-primary;
            border: none;
            cursor: pointer;
        }
    }
}

.form{
    display: flex;
    flex-direction:column;
    background: #fff;
    padding: 1rem;
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

.formModal{
  @include display;
  max-width: 100%;
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

.modale{
  @include display($dirColumn: inherit);
  justify-content: center;
  align-items: center;
  &__overlay{
    background: rgba($color: #000000, $alpha: 0.5);
    @include position;
  }
}
.modalInterior{
    @include display;
    background: #fff;
    color: #333;
    width: 320px;
    height: 425px;
    padding: 50px;
    @include position(
        $top: 30%,
        $right: inherit,
        $bottom: inherit,
        $left: 39%
    );
  &__btn{
    @include position(
    $position: absolute, 
    $top: 1rem,
    $right: 0,
    $bottom: inherit,
    $left: 23rem
  );
    height: fit-content;
    background: none;
    border: none;
    cursor: pointer;
  }
}

.loader {
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
  text-align: center;
  justify-content: space-around;
  &__btn{
    @include btn;
    &--icon{
      color: #41b3a3;
    }
  }
}
.validComment{
  width: 85%;
  text-align: center;
  &__btn{
    @include btn;
    width: 10rem;
  }
}

@media screen and (max-width: 800px) {
    .msg{
        width: 95vw;
    }
    .comment{
        margin: 0.5rem;
        &__avatar{
        width: 2rem;
        height: 2rem;
        margin: 0 5px 0 0 ;
        }
        &__ctrl{
            width: 85%;
        }
    }
    .commentUser{
        margin: 0.5rem;
        &__ctrl{
            margin: 0 0 1rem 0;
        }
    }
    .modalInterior{
        top: 15%;
        left: 8%;
        padding: 0;
        &__btn{
            left: 85%;
        }
    }
    .formModal{
        margin: auto 1rem;
    }
}
</style>