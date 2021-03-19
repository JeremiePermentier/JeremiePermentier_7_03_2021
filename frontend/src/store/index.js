import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    status: "",
    user: "",
    test: null
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
    GET_ALL_MESSAGE(state){
      state.test = "ok"
    }
  },
  actions: {
    submitLogin({ commit }, user){
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({url: 'http://localhost:3000/api/users/login', data: user, method: 'POST'})
        .then(resp => {
          const token = resp.data.token
          this.token = `Bearer ` + token
          this.user = resp.data.userId
          axios.defaults.headers.common['Authorization'] = this.token
          commit('AUTH_SUCCESS', token)
          resolve(resp)
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
        .then(resp => {
          const token = resp.data.token
          console.log(resp.data)
          this.token = token
          this.user = resp.data.userId
          axios.defaults.headers.common['Authorization'] = token
          commit('AUTH_CREATE')
          resolve(resp)
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
      commit('AUTH_REQUEST')
      axios.post('http://localhost:3000/api/message/add', {
        ...data
      })
      .then(resp => {
        alert(resp)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getMessage({commit}){
      commit('AUTH_REQUEST')
      axios.get('http://localhost:3000/api/message')
      .then(response => {
        commit('GET_ALL_MESSAGE', response)
      })
      .catch(error => console.log(error))
    }
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
