const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  avatar: (state) => state.user.avatar,
  baseData: (state) => state.common.baseData,
  host: (state) => state.common.host,
  orderDetail: (state) => state.details.orderDetail,
  bankData: (state) => state.details.bankData,
  listData: (state) => state.details.listData,
  OnLine: (state) => state.user.online,
  EndTime: (state) => state.user.endTime,
  ShowMask: (state) => state.user.showMask,
};
export default getters;
