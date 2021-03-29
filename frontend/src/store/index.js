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
    message: "",
    loading: true,
    successMsg: false,
    allMsg: ""
  },
  mutations: {
    AUTH_REQUEST(state){
      state.status = 'loading';
    },
    AUTH_SUCCESS(state, dataUser){
      state.status = 'success';
      state.token = dataUser.token;
      state.userId = dataUser.userId;
      state.pseudo = dataUser.pseudo;
    },
    AUTH_CREATE(state){
      state.status = 'userCreate';
    },
    AUTH_ERROR(state){
      state.status = 'error';
    },
    LOGOUT(state){
      state.status = '';
      state.token = '';
    },
    GET_ALL_MESSAGE(state, res){
      state.allMsg = res.data;
    },
    AUTH_REQUEST_MSG(state){
      state.loading = false
    },
    AUTH_SUCCESS_MSG(state){
      state.loading = true;
      state.successMsg = true;
    },
    GET_ONE_MESSAGE(state, message){
      state.message = message;
    }
  },
  actions: {
    submitLogin({ commit }, user){
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({url: 'http://localhost:3000/api/users/login', data: user, method: 'POST'})
        .then(res => {
          const dataUser = {
            token: `Bearer ` + res.data.token,
            userId: res.data.userId,
            pseudo: res.data.pseudo
          }
          axios.defaults.headers.common['Authorization'] = dataUser.token
          commit('AUTH_SUCCESS', dataUser)
          resolve(res)
          console.log(res)
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
    getAllMessage({commit}){
      axios.get('http://localhost:3000/api/message')
        .then(res => {
          console.log(res)
            commit('GET_ALL_MESSAGE', res)
        })
        .catch(error => console.log(error))
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
    deleteMessage({commit}, data){
      axios.delete(`http://localhost:3000/api/message/${data.id}`)
      .then(res => {
          console.log(res);
          commit('AUTH_SUCCESS_MSG');
      })
      .catch((err) => console.log(err))
    },
  },
  methods: {
    restart(){
      axios.get('http://localhost:3000/api/message')
        .then(res => {
          console.log(res)
          this.allMsg = res.data
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
