import Vue from 'vue';

class UtilJson {
  constructor() { };
  static init() { };
  static #replacer(k, v) {
    if (typeof v === "function") { return v.toString() };
    return v;
  };
  static stringify(argobj) {
    return JSON.stringify(argobj, UtilJson.#replacer);
  };
  static #reviver(k, v) {
    if (typeof v === "string" && v.match(/^function/)) {
      return Function.call(this, "return " + v)();
    }
    return v;
  };
  static parse(argjson) {
    return JSON.parse(argjson, UtilJson.#reviver);
  };
};

UtilJson.init();
Vue.prototype.$UtilJson = UtilJson;
export default ({ app }) => {
  app.$UtilJson = UtilJson;
};