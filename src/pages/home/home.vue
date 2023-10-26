<template>
  <view class="navigation">
    <view class="nav-top"></view>
    <view class="nav-height">个人详情页</view>
  </view>
  <view class="body">
    <view class="personal-info">
      <view class="avatar">
        <image :src="user.avatarUrl" />
      </view>
      <view class="info">
        <view class="name">{{ user.name }}</view>
        <view class="id">{{ user.studentId }}</view>
        <view class="email">{{ user.email }}</view>
        <view class="modify-personal-info" @tap="navToModifyPersonalInfo">
          <u-text
            suffixIcon="arrow-right"
            iconStyle="font-size: 18px"
            text="点击修改个人信息"
          ></u-text>
        </view>
      </view>
    </view>
    <view class="profile">
      <uaMarkdown />
    </view>
    <view class="logout">
      <u-button
        @tap="logout"
        color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
        >退出登录</u-button
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import RouteConfig from "@/config/routes";
import uaMarkdown from "@/components/ua-markdown/ua-markdown.vue";

let user = ref(uni.getStorageSync("user"));
let menu_top = ref<string>("");
let menu_height = ref<string>("");
onShow(() => {
  user = uni.getStorageSync("user");
  let menuButtonBoundingClientRect = uni.getStorageSync(
    "menuButtonBoundingClientRect"
  );
  menu_top.value = menuButtonBoundingClientRect.top + "px";
  menu_height.value = menuButtonBoundingClientRect.height + "px";
});

const navToModifyPersonalInfo = () => {
  uni.navigateTo({
    url: RouteConfig.modifyPersonalInfo.path,
  });
};

const logout = () => {
  uni.clearStorageSync();
  uni.reLaunch({
    url: RouteConfig.login.path,
  });
};
</script>

<style>
.nav-top {
  height: v-bind(menu_top);
}
.nav-height {
  height: calc(v-bind(menu_height) + 10px);
  line-height: v-bind(menu_height);
  padding-left: 20rpx;
  font-size: 3vh;
  /* color: #ffffff; */
  font-weight: bold;
}

.navigation {
  display: flex;
  flex-direction: column;
  background-color: #8df0a2;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.personal-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2vh;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 5vh;
  padding: 5vw;
  background-color: #8ddff0;
  border-radius: 10px;
}

.avatar {
  width: 30vw;
  height: 30vw;
  border-radius: 50%;
  overflow: hidden;
}

.avatar image {
  width: 100%;
  height: 100%;
}

.info {
  display: flex;
  flex-direction: column;
  margin-left: 5vw;
}

.name {
  font-size: 5vw;
  font-weight: bold;
}

.id {
  font-size: 4vw;
  color: #999999;
}

.email {
  font-size: 4vw;
  color: #999999;
}

.modify-personal-info {
  margin-top: 5vw;
}

.report {
  width: 80vw;
  margin-bottom: 5vh;
}

.logout {
  width: 80vw;
}
</style>
