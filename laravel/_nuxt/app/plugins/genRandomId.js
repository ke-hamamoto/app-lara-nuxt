import Vue from 'vue'

const $genRandomId = () => {
    let uid =
        "@" + Math.floor(Date.now() * Math.random()).toString(16);
    return uid;
};
Vue.prototype.$genRandomId = $genRandomId;
export default ({ app }) => {
    app.$genRandomId = $genRandomId;
};