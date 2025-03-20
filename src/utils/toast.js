import { Toast } from "vant";

export const showLoading = (text) => {
  Toast.loading({
    message: text || "加载中",
    forbidClick: true,
    loadingType: "spinner",
    duration: 0,
  });
};

export const hideLoading = () => {
  Toast.clear();
};

export const vantToast = Toast;
