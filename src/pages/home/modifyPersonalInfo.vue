<template>
  <view>
    <form class="passage" @submit="pushToServer">
      <u-input
        v-model="user.name"
        placeholder="请输入用户名"
        maxlength="20"
      ></u-input>
      <u-input
        v-model="user.email"
        placeholder="请输入邮箱"
        maxlength="20"
      ></u-input>
      <u-input
        v-model="user.bio"
        placeholder="请输入个人简介"
        maxlength="20"
      ></u-input>
      <u-input
        v-model="user.avatarUrl"
        placeholder="请输入头像链接"
        maxlength="100"
      ></u-input>
    </form>
  </view>
  <view>
    <u-button type="primary" @tap="pushToServer">确定</u-button>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import Api from "@/public/api";
import RouteConfig from "@/config/routes";

let user = ref(uni.getStorageSync("user"));
onLoad(() => {});

const pushToServer = () => {
  Api.modifyPersonalInfo(user.value).then((res: any) => {
    if (res.statusCode === 200) {
      uni.setStorageSync("user", user.value);
    }
    uni.showToast({
      title: "修改成功",
      icon: "none",
    });
    uni.reLaunch({
      url: RouteConfig.home.path,});
  });
};
</script>

<style />
