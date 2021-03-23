import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    token: "",
    status: "",
    userId: "",
    pseudo: "",
    successMsg: "",
    loading: true
  },
  mutations: {
    AUTH_REQUEST(state){
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, token){
      state.status = 'success'
      state.token = token
      // state.user = user
    },
    AUTH_CREATE(state){
      state.status = 'userCreate'
    },
    AUTH_ERROR(state){
      state.status = 'error'
    },
    LOGOUT(state){
      state.status = ''
      state.token = ''
    },
    GET_ALL_MESSAGE(state, res){
      state.allMsg = res;
    },
    AUTH_REQUEST_MSG(state){
      state.loading = false
    },
    AUTH_SUCCESS_MSG(state){
      state.loading = true
    }
  },
  actions: {
    submitLogin({ commit }, user){
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({url: 'http://localhost:3000/api/users/login', data: user, method: 'POST'})
        .then(res => {
          const token = res.data.token
          this.token = `Bearer ` + token
          this.userId = res.data.userId
          this.pseudo = res.data.pseudo
          axios.defaults.headers.common['Authorization'] = this.token
          commit('AUTH_SUCCESS', token)
          resolve(res)
        })
        .catch(err => {
          commit('AUTH_ERROR')
          this.token = ""
          reject(err)
        })
      })
    },
    registerUser({ commit }, user){
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({url: 'http://localhost:3000/api/users/signup', data: user, method: 'POST'})
        .then(res => {
          // const token = res.data.token
          console.log(res.data)
          // this.token = token
          this.user = res.data.user
          this.pseudo = res.data.pseudo
          // axios.defaults.headers.common['Authorization'] = token
          commit('AUTH_CREATE')
          resolve(res)
        })
        .catch(err => {
          commit('AUTH_ERROR', err)
          this.token = ""
          reject(err)
        })
      })
    },
    logout({commit}){
      commit('LOGOUT')
      this.token = ""
      delete axios.defaults.headers.common['Authorization']
    },
    addMessage({commit}, data){
      commit('AUTH_REQUEST_MSG');
      axios({
        method: "post",
        url: "http://localhost:3000/api/message/add",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(res => {
        console.log(res);
        commit('AUTH_SUCCESS_MSG');
      })
      .catch(err => {
        console.log(err);
        commit('AUTH_ERROR_MSG');
      })
    },
    // getMessage({commit}){
    //   commit('AUTH_REQUEST')
    //   axios.get('http://localhost:3000/api/message')
    //   .then(res => {
    //     commit('GET_ALL_MESSAGE', res)
    //   })
    //   .catch(error => console.log(error))
    // }
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
