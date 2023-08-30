<template>
  <view class="content">
    <view class="navigation">
      <view class="nav-top"></view>
      <view class="nav-height">西大樟树林</view>
    </view>

    <view class="head-pic">
      <image mode="aspectFill" src="@/static/images/headpic.jpg"></image>
    </view>
    <view class="toolbox">
      <u-grid col="4">
        <u-grid-item v-for="(item, index) in RouteConfig.toolbox" @tap="">
          <u-icon :name="item.icon" size="22" />
          <view>{{ item.name }}</view>
        </u-grid-item>
      </u-grid>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import RouteConfig from "@/config/routes";

let menu_top = ref<string>("");
let menu_height = ref<string>("");
onMounted(() => {
  let menuButtonBoundingClientRect = uni.getStorageSync(
    "menuButtonBoundingClientRect"
  );
  menu_top.value = menuButtonBoundingClientRect.top + "px";
  menu_height.value = menuButtonBoundingClientRect.height + "px";
});

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
