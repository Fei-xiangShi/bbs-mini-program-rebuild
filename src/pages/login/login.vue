<template>
  <view class="blackDrawer" />
  <view
    class="login-container"
    style="background-image: url(../../static/images/login/loginBackground.jpg)"
  >
    <view class="inner-container">
      <img class="user-img" src="../../static/images/login/userImg.png" />
      <form @submit="login">
        <input
          v-model="credentials.account"
          type="text"
          placeholder="学号/校园网账号"
          placeholder-style="color:black;"
        />
        <input
          v-model="credentials.password"
          type="password"
          placeholder="密码"
          placeholder-style="color:black;"
        />
        <u-checkbox-group direction="horizontal">
          <u-checkbox
            @change="changeAccessbility"
            shape="circle"
            active-color="green"
            name="agree"
          />
          <view style="color: white" class="login-checkbox-text"
            >我已详细阅读并同意了<span
              class="user-agreement"
              @click="showUserAgreement"
              >用户协议</span
            ></view
          >
        </u-checkbox-group>
        <button @tap="login" v-if="!isloading" :disabled="isAgree === false" />
        <u-loading-icon mode="semicircle" size="45" v-if="isloading" />
      </form>
      <view class="line" />
      <view class="login-passage">
        一处风声，看落花流萤，那粉色佳人，摇曳，摇曳。苍天赐予一个多情的梦，在花落之间。怎堪月痩影单，残风缠绵，好一个悲曲，绚烂绚烂。
      </view>
      <view class="device-information">
        <view>欢迎来自 {{ IpInfo.data.addr }} 的用户</view>
        <view
          >您现在位于 {{ IpInfo.data.province + " " + IpInfo.data.city }}</view
        >
        <view
          >您现在正在使用
          {{ deviceInfo.osName + " " + deviceInfo.osVersion }}</view
        >
      </view>
    </view>
    <u-popup
      customStyle="overflow-y: scroll"
      position="bottom"
      :show="isShowingUserAgreement"
      @close="showUserAgreement"
    >
      <view style="padding: 20px">
        <view style="font-size: 20px; font-weight: bold">用户协议</view>
        <view style="margin-top: 20px">
          https://blog.csdn.net/Mr_Dong_cson/article/details/123136258
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import Api from "@/public/api";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import routes from "@/config/routes";
import initUser from "@/utils/initUser";

let deviceInfo = uni.getSystemInfoSync();
let IpInfo = ref({
  code: 0,
  message: "",
  ttl: "",
  data: {
    addr: "",
    country: "",
    province: "",
    city: "",
    isp: "",
    zone_id: "",
    country_code: 0,
  },
});

let isAgree = ref(false);
let isShowingUserAgreement = ref(false);

const showUserAgreement = () => {
  isShowingUserAgreement.value = !isShowingUserAgreement.value;
};

const changeAccessbility = () => {
  isAgree.value = !isAgree.value;
};

const credentials = ref({
  account: "",
  password: "",
});

let isloading = ref(false);
const login = async () => {
  isloading.value = true;
  const response: any = await Api.swuLogin(credentials.value);
  if (response.header["1235d6"] === "true") {
    uni.setStorageSync(
      "jwt",
      response.header["Set-Cookie"]
        .split(";")
        .find((row: string) => row.startsWith("doorKey="))
    );
    initUser();
    uni.reLaunch({
      url: routes.index.path,
    });
  } else {
    uni.showToast({
      title: "登录失败",
      icon: "none",
    });
  }
  isloading.value = false;
};

onLoad(() => {
  Api.getIpInfo().then((res: any) => {
    IpInfo.value = res.data;
  });
  initUser();
  if (uni.getStorageSync("jwtIsExpired") === false) {
    if (uni.getStorageSync("user")) {
      uni.reLaunch({
        url: routes.index.path,
      });
      return;
    }
    initUser();
    uni.reLaunch({
      url: routes.index.path,
    });
  }
});
</script>

<style>
.device-information {
  text-align: right;
  color: rgb(110, 110, 110);
  font-size: 14px;
  position: fixed;
  bottom: 2%;
  right: 2%;
}

.login-checkbox-text {
  position: relative;
  top: 3px;
}

.user-agreement {
  color: #07f74f;
  cursor: pointer;
}

.blackDrawer {
  pointer-events: none; /* 允许与位于其下方的内容进行交互 */
  z-index: 1; /* 将遮罩层放置在内容上方 */
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
}

.inner-container {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  bottom: 0px;
}

.user-img {
  margin-top: 20px;
  margin-bottom: 40px;
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  border: none;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 5px;
  width: 100%;
  height: 30px;
  background-color: white;
  color: black;
}

button {
  width: 60px;
  height: 60px;
  padding: 8px 16px;
  margin-top: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 100%;
  background-image: url(../../static/icons/login/login.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40px;
}

.line {
  float: right;
  width: 30%;
  height: 0.5px;
  margin-top: 30px;
  background: rgb(208, 208, 208);
  position: relative;
  text-align: center;
  opacity: 0.8;
}

.login-passage {
  color: rgb(208, 208, 208);
  margin-top: 20px;
  margin-left: 20%;
  margin-right: 20%;
  font-weight: 70;
  text-indent: 2rem;
}
</style>
