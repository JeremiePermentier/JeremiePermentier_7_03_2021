<template  v-for="(info , imageUrl) in infos">
    <div>
        <!-- <img  v-for="(infoImg, imageUrl) in infos" :key="imageUrl" :src="infoImg.imageUrl" alt="">
        <h2 v-for="(infoTitle, title) in infos" :key="title">{{ infoTitle.imageUrl }}</h2> -->
    </div>
</template>

<script>
// import {mapActions} from "vuex";
import axios from 'axios'

export default {
    name: 'Message',
    data(){
        return{
            infos: null
        }
    },
    mounted(){  
        axios.get('http://localhost:3000/api/message')
        .then(res => {
            console.log(res.data)
            this.infos = res.data
        })
        .catch(error => console.log(error))
    }
}
</script>

<style lang="scss" scoped>

</style>