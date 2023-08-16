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

const initUser = () => {
  setJwtExpiration();
  setUser();
  setMenu();
  setClassTable();
};

export default initUser;
