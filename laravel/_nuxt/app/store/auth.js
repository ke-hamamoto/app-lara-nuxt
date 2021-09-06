import Vue from 'vue';

export const state = () => ({
  user: null,
  statusCode: null,
  messages: null,
})

export const getters = {
  currentUser: (state) => {
    return state.user
  },
  isLogin: (state) => {
    return !!state.user
  },
  isError: (state) => {
    return state.messages === null
  },
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setStatus(state, error) {
    state.statusCode = error.status
    state.messages = error.messages
  },
  clearStatus(state) {
    state.statusCode = null
    state.messages = null
  },
}

export const actions = {
  async login({ commit, dispatch }, submitData) {
    const $axios8080 = Vue.prototype.$axios8080;
    await $axios8080
      .post('/api/login', submitData)
      .then((response) => {
        console.log(response);
        commit('clearStatus')
        commit('setUser', response)
      })
      .catch((err) => {
        dispatch('errorHandler', err)
      })
  },
  errorHandler({ commit, dispatch }, err) {
    commit('setStatus', {
      status: err.response.status,
      messages: err.response.data.errors,
    })
  },

}