import Vue from 'vue';

export const state = () => ({
  test: null,
})

export const getters = {
  test: (state) => {
    return state.test
  },
}

export const mutations = {
  setTest(state, test) {
    state.test = test
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const $axios8080 = Vue.prototype.$axios8080;
    await $axios8080
      .get('/api/current_user')
      .then((user) => {
        console.log(user);
        commit('auth/setUser', user)
      })
      .catch(() => commit('auth/setUser', null))
  },
}