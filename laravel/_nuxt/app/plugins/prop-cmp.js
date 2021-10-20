import Vue from 'vue'

const propKeyOrder = ['name', 'pageId'];

const $genCmpObj = (cmpObj = {}) => {
  propKeyOrder.forEach((keyName) => {
    cmpObj[keyName] = cmpObj[keyName] || '';
  });
  return cmpObj;
};

const $genCmpKey = (cmpObj = {}) => {
  let stringKeys = '';
  propKeyOrder.forEach((keyName) => {
    stringKeys += cmpObj[keyName] || '';
  });
  return stringKeys;
};

Vue.prototype.$genCmpObj = $genCmpObj;
Vue.prototype.$genCmpKey = $genCmpKey;
export default ({ app }) => {
  app.$genCmpObj = $genCmpObj;
  app.$genCmpKey = $genCmpKey;
};