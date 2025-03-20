const state = {
  orderDetail: {},
  bankData: {},
  listData: {},
};

const mutations = {
  SET_ORDER_DETAIL: (state, data) => {
    state.orderDetail = data;
  },
  SET_BANK_DATA: (state, data) => {
    state.bankData = data;
  },
  SET_LIST_DATA: (state, data) => {
    state.listData = data;
  },
};
const actions = {
  setOrderDetail({ commit }, data) {
    commit("SET_ORDER_DETAIL", data);
  },
  setBankData({ commit }, data) {
    commit("SET_BANK_DATA", data);
  },
  setListData({ commit }, data) {
    commit("SET_LIST_DATA", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
