<template>
  <view>
    <u-button type="primary" @tap="refreshClassTable">刷新</u-button>
  </view>
  <view class="json">{{ classTable }}</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Api from "@/public/api";
import RouteConfig from "@/config/routes";

let classTable = ref(uni.getStorageSync("classTable"));

const refreshClassTable = () => {
  Api.getClassTable().then((res: any) => {
    uni.setStorageSync("classTable", res.data || []);
    classTable.value = res.data || [];
    uni.reLaunch({ url: RouteConfig.classTable.path });
  });
};
</script>

<style></style>
