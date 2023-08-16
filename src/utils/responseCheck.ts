import routes from "@/config/routes";

const ResponseCheck = {
  resIsSuccess: (res: any) => {
    if (res.statusCode === 401) {
      uni.showToast({
        title: "请先登录",
        icon: "none",
      });
      uni.navigateTo({
        url: routes.login.path,
      });
      return;
    }
    if (res.statusCode === 404) {
      uni.showToast({
        title: "网络错误",
        icon: "none",
      });
      return;
    }
    if (res.statusCode === 500) {
      uni.showToast({
        title: "服务器错误",
        icon: "none",
      });
      return;
    }
  },
};

export default ResponseCheck;
