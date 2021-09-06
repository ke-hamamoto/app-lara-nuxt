import Vue from 'vue';

export const state = () => ({
  $forms: {},
})

export const getters = {
  test: (state) => {
    return state.test
  },
}

export const mutations = {
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
        if (keyArr in targetState) {
          targetState[keyArr] = null;
        }
        return Vue.set(targetState, keyArr, newData);
      }
    }
    chain(keys, state[stateName]);
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) { },
}