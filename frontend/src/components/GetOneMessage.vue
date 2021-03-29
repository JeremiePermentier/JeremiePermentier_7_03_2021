<template>
    <div>
        <div class="msg container">
            <div class="msg__container">
                <img :src="infos.imageUrl" alt="" class="msg__container--img">
            </div>
            <div>
                <h2 class="msg__title">{{ infos.title }}</h2>
                <p class="msg__text">{{ infos.message }}</p>
            </div>
            <div class="msg__info">
                <div>
                    <p>Publié par {{ infos.pseudo }}<br/>
                    le {{ infos.createdAt }}</p>
                </div>
                <div class="msg__interaction">
                    <p class="msg__interaction--comment">{{ countComments() }} <i class="far fa-comment"></i></p>
                    <p class="msg__interaction--like" @click="like()">
                        {{ countLikes() }}
                        <i v-if="!likeOrNolike()" class="far fa-thumbs-up"></i>
                        <i v-else-if="likeOrNolike()" class="fas fa-thumbs-up"></i>
                    </p>
                </div>
            </div>
        </div>
        <div class="comment container">
            <p class="comment__avatar">
                {{ this.$store.state.pseudo[0] }}
            </p>
            <form class="comment__ctrl" @submit.prevent="sendComment">
                <textarea name="comment" v-model="message" placeholder="Écrire un commentaire..." class="comment__ctrl--textarea" id="comment"
                 cols="50" rows="6" minlength="10" maxlength="300" required></textarea>
                <div class="comment__ctrl--btn">
                    <!-- <button :disabled="message == false" @click="alert('ok')" class="cancel">Annuler</button> -->
                    <button class="send" >Envoyer</button>    
                </div> 
            </form>
        </div>
        <div class="commentUser container" v-for="comment in comments" :key="comment">
            <p class="comment__avatar">{{ comment.User.pseudo[0] }}</p>
            <div class="commentUser__container">
                <p class="commentUser__text">{{ comment.comment }}</p>
                <div v-if="comment.userId == userId" class="commentUser__ctrl">
                    <button><i title="Modifier le message" class="fas fa-pen"></i></button>
                    <button @click="deleteComment(comment.id)" ><i title="Supprimer le commentaire" class="fas fa-trash-alt"></i></button>
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
                infos: "",
                comments: "",
                likes: "",
                userId: this.$store.state.userId,
                message: ""
            }
        },
        mounted(){
        axios.get('http://localhost:3000/api/message/' + this.$route.params.id)
        .then(res => {
            this.infos = res.data
            this.comments = res.data.Comments
            this.likes = res.data.Likes
        })
        .catch(error => console.log(error))
        },
        methods:{
            ...mapActions(["addComment"]),
            like(){
                axios({url: 'http://localhost:3000/api/like/' + this.$route.params.id, method: 'POST'})
                .then(() => {
                    this.restart()
                })
                .catch(res => {console.log(res)})
            },
            countComments(){
                return this.comments.length
            },
            countLikes(){
                return this.likes.length
            },
            restart(){
                axios.get('http://localhost:3000/api/message/' + this.$route.params.id)
                .then(res => {
                    this.infos = res.data
                    this.comments = res.data.Comments
                    this.likes = res.data.Likes
                    console.log(this.infos)
                })
                .catch(error => console.log(error))
            },
            likeOrNolike(){
                for (let i = 0 ; i < this.likes.length; i++){
                    const userIdLike  = this.likes[i].userId
                    if( userIdLike == this.userId){
                        return true
                    }
                }
            },
            // Send form
            sendComment(){
                axios({
                    method: "post",
                    url: `http://localhost:3000/api/comment/${this.$route.params.id}`,
                    data: {
                        comment: this.message
                    }
                })
                .then(res => {
                    console.log(res);
                    this.restart()
                    this.message = ""
                })
                .catch(err => {
                    console.log(err);
                })
            },
            deleteComment(id){
                axios.delete(`http://localhost:3000/api/comment/${id}`)
                .then((res) => {
                    console.log(res)
                    this.restart()
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../assets/utils/_variables.scss";
.container{
    max-width: 500px;
    margin: 2rem auto;
}
.msg{
    border-bottom: 1px solid #d6d6d6;
    text-align: left;
    &__title{
        color: #000;
        display: inline-block;
    }
    &__container{
        height: 300px;
        &--img{
            max-width: 100%;
            width: max-content;
            max-height: 100%;
            object-fit: cover;
            border-radius: 4px 4px 0 0;
        }
    }
    &__info, &__interaction{
        display: flex;
        justify-content: space-between;
        &--like, &--comment{
            margin: 1rem;
            cursor: pointer;
        }
    }
}
.comment{
    display: flex;
    justify-content: space-between;
    &__avatar{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        background: grey;
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
    display: flex;
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
            border: none;
            cursor: pointer;
        }
    }
}
</style>