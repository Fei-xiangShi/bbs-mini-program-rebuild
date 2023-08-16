<template>
  <view class="content">
    <view class="navigation">
      <view class="nav-top"></view>
      <view class="nav-height">西大樟树林</view>
    </view>

    <view class="head-pic">
      <image mode="aspectFill" src="@/static/images/headpic.jpg"></image>
    </view>
    <view style="height: 999px"></view>
  </view>
</template>

<script setup lang="ts">
import Api from "@/public/api";
import { ref, onMounted } from "vue";

let menu_top = ref<string>("");
let menu_height = ref<string>("");
onMounted(() => {
  let menuButtonBoundingClientRect = uni.getStorageSync(
    "menuButtonBoundingClientRect"
  );
  menu_top.value = menuButtonBoundingClientRect.top + "px";
  menu_height.value = menuButtonBoundingClientRect.height + "px";
  pageData();
});

async function pageData() {
  const res: any = await Api.frontPage();
  console.log(res);
}
</script>

<style>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.nav-top {
  height: v-bind(menu_top);
}
.nav-height {
  height: v-bind(menu_height);
  line-height: v-bind(menu_height);
  padding-left: 20rpx;
  font-size: 36rpx;
  color: #ffffff;
  font-weight: bold;
}
.head-pic image {
  width: 100%;
  height: 400rpx;
}
</style>
