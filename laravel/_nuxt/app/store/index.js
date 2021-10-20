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
  async nuxtServerInit({ commit }, { $axios }) {
    // const $axios8080 = Vue.prototype.$axios8080;
    const conf8080 = {
      baseURL: process.client
        ? "http://localhost:8080"
        : "http://nginx:80",
      withCredentials: true,
      timeout: 300000
    }
    const $axios8080 = $axios.create(conf8080);

    await $axios8080
      .$get('/api/current_user')
      .then((data) => {
        commit('auth/setUser', data)
      })
      .catch(() => commit('auth/setUser', null))
  },
}