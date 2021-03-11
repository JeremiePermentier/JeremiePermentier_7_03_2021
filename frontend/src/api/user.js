import axios from 'axios'

export default {
    login(data){
        axios({
            method: 'POST',
            url: 'http://localhost:3000/api/users/login',
            data: data
          })
          .then(function (response){
            console.log(response);
          })
          .catch(function (error){
            console.log(error)
          })
    }
}