<template>
  <view>
    <u-button type="primary" @tap="refreshClassTable">刷新</u-button>
  </view>
  <view>
    <u-scroll-list>
      <view
        v-for="item in [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        ]"
        :key="item"
      >
        <view @tap="toggleNow" :id="String(item)"> 第{{ item }}周 </view>
      </view>
    </u-scroll-list>
  </view>
  <view class="classTable" v-for="item in briefList[now]">
    <view class="class">{{ item }}</view>
  </view>
  
</template>

<script setup lang="ts">
import { ref } from "vue";
import Api from "@/public/api";
import RouteConfig from "@/config/routes";
import { onLoad } from "@dcloudio/uni-app";
import formatClassTable from "@/utils/formatClassTable";

const now = ref(0);

const toggleNow = (e: any) => {
  now.value = Number(e.target.id);
  console.log(now.value);
};

const refreshClassTable = () => {
  Api.getClassTable().then((res: any) => {
    uni.setStorageSync("classTable", res.data || []);
    uni.reLaunch({ url: RouteConfig.classTable.path });
  });
};

let briefList = ref(uni.getStorageSync("courseByWeeks"));

onLoad(() => {
  if (briefList.value.length === 0) {
    refreshClassTable();
    briefList.value = formatClassTable();
  }
});
</script>

<style></style>
