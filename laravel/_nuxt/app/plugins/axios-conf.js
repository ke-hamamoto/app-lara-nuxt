import Vue from 'vue'
import $axios from 'axios'

Vue.prototype.$axios_conf = [];

const conf8080 = {
  baseURL: process.env.NODE_ENV !== "production" ? 'http://localhost:8080' : 'http://localhost:8080',
  timeout: 300000
}
const ins8080 = $axios.create(conf8080);
Vue.prototype.$axios_conf[8080] = Vue.prototype.$axios8080 = ins8080;

const conf8888 = {
  baseURL: process.env.NODE_ENV !== "production" ? 'http://localhost:8888' : 'http://localhost:8888',
  timeout: 300000
}
const ins8888 = $axios.create(conf8888);
Vue.prototype.$axios_conf[8888] = Vue.prototype.$axios8888 = ins8888;

export default ({ app }) => {
  app.$axios_conf = { 8080: ins8080, 8888: ins8888 }
}
