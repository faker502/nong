import { loginApi, registerApi, userInfoApi } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const state = {
  token: getToken(),
  avatar: "",
  userInfo: {},
};

const mutations = {
  SET_TOKEN: (state, data) => {
    state.token = data;
  },
  SET_AVATAR: (state, data) => {
    state.avatar = data;
  },
  SET_USER_INFO: (state, data) => {
    state.userInfo = { ...state.userInfo, ...data };
  },
  RESET_USER_INFO: (state) => {
    state.userInfo = {};
  },
};

const actions = {
  async registerFn({ commit }, data) {
    try {
      return await new Promise((resolve, reject) => {
        registerApi(data)
          .then((res) => {
            commit("SET_TOKEN", res.data.token);
            commit("SET_AVATAR", res.data.avatar);
            setToken(res.data.token);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch {}
  },
  async loginFn({ commit }, data) {
    try {
      return await new Promise((resolve, reject) => {
        loginApi(data).then((res) => {
          commit("SET_TOKEN", res.data.token);
          commit("SET_AVATAR", res.data.avatar);
          commit("SET_USER_INFO", res.data);
          setToken(res.data.token);
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    } catch {}
  },
  Login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi(userInfo)
        .then(res => {
          console.log(res);
          setToken(res.token);
          commit("SET_TOKEN", res.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  async userInfoFn({ commit }) {
    try {
      return await new Promise((resolve, reject) => {
        userInfoApi()
          .then((res) => {
            commit("SET_USER_INFO", res.data);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch {}
  },
  async logOut({ commit }) {
    try {
      return await new Promise((resolve, reject) => {
        logoutApi()
          .then((res) => {
            commit("SET_USER_INFO", {});
            commit("SET_TOKEN", "");
            removeToken();
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch {}
  },
  resetUserInfo({ commit }) {
    commit("RESET_USER_INFO");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
