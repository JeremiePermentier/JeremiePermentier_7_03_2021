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
            <button v-if="info.userId === userId" @click="deleteMsg(info.id)" class="btn" :class="{ 'trash': userClick, 'btnTrash': userClick == false }"><i class="fas fa-trash-alt"></i></button>
            <button v-if="info.userId === userId" class="btn" :class="{ 'update': userClick, 'btnUpdate': userClick == false }"><i class="fas fa-pen"></i></button>
            <button v-if="info.userId === userId" @click="btnClick()" class="plus"><i class="fas fa-plus"></i></button>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: 'Message',
    data(){
        return{
            infos: this.$store.state.allMsg,
            userClick: null,
            userId: this.$store.state.userId
        }
    },
    mounted(){  
        this.$store.dispatch("getAllMessage");
    },
    methods: {
        ...mapActions(["deleteMessage"]),
        getOnMsg(id){
            this.$router.push(`message/${id}`)
        },
        btnClick(){
            if(this.userClick == null || this.userClick == false){
                this.userClick = true;
            } else {
                this.userClick = false;
            }
        },
        deleteMsg(id){
            this.deleteMessage({id})
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
            border: 3px solid #00000075;
            top: 15rem;
            right: 1rem;
            background: #00000075;
            color: white;
            padding: 1rem;
            border-radius: 100%;
        }
    .btn{
        opacity: 0;
    }
    .btnTrash{
        position: absolute;
        border: 3px solid #00000075;
        top: 15rem;
        right: 1rem;
        background: #00000075;
        color: white;
        padding: 1rem;
        border-radius: 100%;
        opacity: 0;
        animation: trashAnimationBack 400ms ease-in-out both;
    }
    .btnUpdate{
        position: absolute;
        border: 3px solid #00000075;
        top: 15rem;
        right: 1rem;
        background: #00000075;
        color: white;
        padding: 1rem;
        border-radius: 100%;
        opacity: 0;
        animation: updateAnimationBack 400ms ease both;
    }
    
    & > .trash{
        animation: trashAnimation 400ms ease-in-out both;
    }
    & > .update{
        animation: updateAnimation 400ms ease-in-out both;
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

@keyframes trashAnimation {
  0%{
      opacity: 0;
  }
  100%{
      transform: translateY(-4rem);
      opacity: 1;
  }

}
@keyframes trashAnimationBack {
  0%{
      opacity: 1;
      transform: translate(-0rem, -4rem);
  }
  35%{
      opacity: 1;
      transform: translate(-1rem, -4rem);
  }
  45%{
      opacity: 1;
      transform: translate(-2rem, -4rem);
  }
  55%{
      opacity: 1;
      transform: translate(-3rem, -4rem);
  }
  65%{
      opacity: 1;
      transform: translate(-4rem, -4rem);
  }
  75%{
      opacity: 1;
      transform: translate(-3rem, -3rem);
  }
  85%{
      opacity: 1;
      transform: translate(-2rem, -2rem);
  }
  95%{
      opacity: 1;
      transform: translate(-1rem, -1rem);
  }
  100%{
      opacity: 0;
      transform: translate(0, 0);
  }

}
@keyframes updateAnimationBack {
  0%{
      opacity: 1;
      transform: translate(-4rem, -0rem);
  }
  35%{
      opacity: 1;
      transform: translate(-4rem, -1rem);
  }
  45%{
      opacity: 1;
      transform: translate(-4rem, -2rem);
  }
  55%{
      opacity: 1;
      transform: translate(-4rem, -3rem);
  }
  65%{
      opacity: 1;
      transform: translate(-4rem, -4rem);
  }
  75%{
      opacity: 1;
      transform: translate(-3rem, -3rem);
  }
  85%{
      opacity: 1;
      transform: translate(-2rem, -2rem);
  }
  95%{
      opacity: 1;
      transform: translate(-1rem, -1rem);
  }
  100%{
      opacity: 0;
      transform: translate(0, 0);
  }

}
@keyframes updateAnimation {
  0%{
      opacity: à;
  }
  100%{
      transform: translateX(-4rem);
      opacity: 1;
  }

}
</style>