<template>
  <view>
    <u-button
      @tap="navToModifyPersonalInfo"
      color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
      >修改个人信息</u-button
    >
  </view>
  <view>
    {{ user }}
  </view>
  
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import RouteConfig from "@/config/routes";

let user = ref(uni.getStorageSync("user"));
onShow(() => {
  user = uni.getStorageSync("user")
});

const navToModifyPersonalInfo = () => {
  uni.navigateTo({
    url: RouteConfig.modifyPersonalInfo.path,
  });
};
</script>

<style />
