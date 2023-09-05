<template>
  <view class="personal-info">
    <u-cell-group>
      <u-cell title="姓名" :value="user.name" :border="false"/>
      <u-cell title="学号" :value="user.studentId" :border="false"/>
    </u-cell-group>
  </view>
  <view>
    <u-button
      @tap="navToModifyPersonalInfo"
      color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
      >修改个人信息</u-button
    >
  </view>
  <view>
    <u-button
    @tap="logout"
    color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
    >退出登录</u-button>
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import RouteConfig from "@/config/routes";

let user = ref(uni.getStorageSync("user"));
onShow(() => {
  user = uni.getStorageSync("user");
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

<style />
