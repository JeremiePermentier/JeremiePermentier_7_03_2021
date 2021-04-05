import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    status: "",
    isAdmin: "",
    userId: "",
    pseudo: "",
    message: "",
    infos: "",
    loading: false,
    successMsg: false,
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
      state.isAdmin = dataUser.isAdmin;
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
      state.infos = res.data;
    },
    AUTH_REQUEST_MSG(state){
      state.loading = true;
    },
    AUTH_SUCCESS_MSG(state){
      state.loading = false;
      state.successMsg = true;
    },
    AUTH_REQUEST_DELETE(state){
      state.loading = true;
    },
    AUTH_SUCCESS_DELETE(state){
      state.loading = false;
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
            isAdmin: res.data.isAdmin,
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
          this.user = res.data.user
          this.pseudo = res.data.pseudo
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
      .then(() => {
        commit('AUTH_SUCCESS_MSG');
      })
      .catch(err => {
        console.log(err);
        commit('AUTH_ERROR_MSG');
      })
    },
    updateMsg({commit}, data){
      commit('AUTH_REQUEST_MSG');
      axios({
        method: "put",
        url: `http://localhost:3000/api/message/${data.get("id")}`,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        commit('AUTH_SUCCESS_MSG');
      })
      .catch(() => {
        commit('AUTH_ERROR_MSG');
      })
    }
  }
})
