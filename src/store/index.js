import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

// 引入vuex-persist插件
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const modulesFiles = require.context("./modules", true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const vuexLocal = new createPersistedState({
  storage: window.localStorage,
  reducer: (state) => {
    return {
      ...state,
    };
  },
});

export default new Vuex.Store({
  getters,
  modules,
  // 默认存储在localStorage
  plugins: [vuexLocal],
});
