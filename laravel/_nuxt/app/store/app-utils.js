import Vue from 'vue';

export const state = () => ({
  $cmps: {},
  $forms: {},
})

export const getters = {
  test: (state) => {
    return state.test
  },
}

export const mutations = {
  $initAppState(state, { stateName, key, newData }) {
    if (newData == null) {
      delete state[stateName][key];
      return;
    }
    state[stateName][key] = newData;
  },
  $delAppState(state, { stateName, key }) {
    delete state[stateName][key];
    return;
  },
  $updateAppState(state, { stateName, keys, newData }) {
    function chain(keyArr, targetState) {
      if (keyArr.length > 1) {
        const keyIdx = keyArr.shift();
        if (!keyIdx in targetState) {
          targetState[keyIdx] = null;
        }
        return chain(keyArr, targetState[keyIdx]);
      }
      else {
        // if (!keyArr in targetState) { targetState[keyArr] = null; }
        return Vue.set(targetState, keyArr, newData);
      }
    }
    chain(keys, state[stateName]);
  },
}

export const actions = {
  async $getcomment({ commit, dispatch }) {
    const $axios8080 = Vue.prototype.$axios8080;
    return await $axios8080
      .get('/api/get-comment')
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        dispatch('auth/errorHandler', err)
      })
  },
  async $addcomment({ commit, dispatch }, submitData) {
    const $axios8080 = Vue.prototype.$axios8080;
    return await $axios8080
      .post('/api/add-comment', submitData)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        dispatch('auth/errorHandler', err)
      })
  },
}