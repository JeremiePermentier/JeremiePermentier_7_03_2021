<template>
    <div>
        <div class="msg"  v-for="info in infos" :key="info.message">
            <div @click="getOnMsg(info.id)" class="msg__container">
                <img class="msg__container--img" :src="info.imageUrl" alt="">
            </div>
            <div>
                <h2 class="msg__title" @click="getOnMsg(info.id)">
                    {{ info.title }}
                </h2>
            </div>
            <div class="msg__info">
                <div>
                    <p>Publié par {{ info.pseudo }}<br/>
                    le {{ info.createdAt }}</p>
                </div>
                <div class="msg__interaction">
                    <p class="msg__interaction--comment">
                        {{ info.Comments.length }} Commentaire 
                        <span v-if="info.Comments.length > 1">s</span>
                    </p>
                    <p class="msg__interaction--like">
                        {{ info.Likes.length }} like
                        <span v-if="info.Likes.length > 1">s</span>
                    </p>
                </div>
            </div>
            <button class="trash"><i class="fas fa-trash-alt"></i></button>
            <button class="update"><i class="fas fa-pen"></i></button>
            <input type="checkbox" name="" id="">
            <button class="plus"><i class="fas fa-plus"></i></button>
        </div>
    </div>
</template>

<script>
// import {mapActions} from "vuex";
import axios from 'axios'

export default {
    name: 'Message',
    data(){
        return{
            infos: null,
        }
    },
    mounted(){  
        axios.get('http://localhost:3000/api/message')
        .then(res => {
            this.infos = res.data
            console.log(this.infos[0].pseudo)
        })
        .catch(error => console.log(error))
    },
    methods: {
        getOnMsg(id){
        this.$router.push(`message/${id}`)
    }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/utils/_variables.scss";

.msg{
    margin: 2rem 0;
    border-bottom: 1px solid #d6d6d6;
    text-align: left;
    position: relative;
    & > button{
            position: absolute;
            top: 15rem;
            right: 1rem;
            background: #000;
            color: white;
            padding: 1rem;
            border-radius: 100%;
        }
    & > .trash{
        transform: translateY(-4rem);
    }
    & > .update{
        transform: translateX(-4rem);
    }
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
        height: 300px;
        cursor: pointer;
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
        }
    }
}
</style>