import Api from "@/public/api";

const setJwtExpiration = () => {
  let jwtIsExpired = true;
  async function checkJwt() {
    await Api.getJwtIsExpired().then((res: any) => {
      if (res.statusCode === 200) {
        jwtIsExpired = false;
      } else {
        jwtIsExpired = true;
      }
      uni.setStorageSync("jwtIsExpired", jwtIsExpired);
    });
  }
  checkJwt();
};

const setUser = () => {
  let user = uni.getStorageSync("user");
  if (!user.id || user.length === 0) {
    Api.home().then((res: any) => {
      if (res.statusCode === 200) {
        user = res.data;
        uni.setStorageSync("user", user);
      }
    });
  }
};

const setMenu = () => {
  Api.getMenu().then((res: any) => {
    res.data = [{ id: 0, name: "热门", parentCategory: null }, ...res.data]
    uni.setStorageSync("menu", res.data || []);
  });
  uni.setStorageSync("isViewing", 0);
};

const setClassTable = () => {
  let classTable = uni.getStorageSync("classTable");
  if (classTable.length === 0) {
    Api.getClassTable().then((res: any) => {
      uni.setStorageSync("classTable", res.data || []);
    });
  }
};

const setWeather = () => {
  let weather = uni.getStorageSync("weather");
  if (weather.length === 0) {
    Api.getWeather().then((res: any) => {
      uni.setStorageSync("weather", res.data.result.daily || []);
    });
  }
};

const setSafeTop = () => {
  let safetop = uni.getStorageSync("menuButtonBoundingClientRect");
  if (!safetop || safetop.length === 0 || safetop === null || safetop === undefined) {
    safetop = uni.getMenuButtonBoundingClientRect();
    uni.setStorageSync("menuButtonBoundingClientRect", safetop);
  }
};

const initUser = () => {
  setJwtExpiration();
  setUser();
  setMenu();
  setClassTable();
  setWeather();
  setSafeTop();
};

export default initUser;
