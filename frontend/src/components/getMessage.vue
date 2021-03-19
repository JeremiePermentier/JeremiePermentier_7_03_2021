<template v-for="info in infos" >
    <div>
        <!-- <p v-for="info in infos" :key="info">{{ info }}</p> -->
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
    mounted () {
       axios.get('http://localhost:3000/api/message')
      .then(response => (this.infos = response.data))
      .catch(error => console.log(error))
    }
}
</script>

<style lang="scss" scoped>

</style>