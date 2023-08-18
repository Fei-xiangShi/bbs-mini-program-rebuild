<template>
  <view>
    <u-button type="primary" @tap="refreshClassTable">刷新</u-button>
  </view>
  <view>
    <u-tabs
      :list="weeks"
      @click="toggleNow"
      lineWidth="30"
      lineColor="#f56c6c"
      :activeStyle="{
        color: '#303133',
        fontWeight: 'bold',
        transform: 'scale(1.05)',
      }"
      :inactiveStyle="{
        color: '#606266',
        transform: 'scale(1)',
      }"
    ></u-tabs>
  </view>
  <classTable :classTable="briefList[now]" />
  <view class="classTable" v-for="item in briefList[now]">
    <view> {{ item }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Api from "@/public/api";
import RouteConfig from "@/config/routes";
import { onLoad } from "@dcloudio/uni-app";
import formatClassTable from "@/utils/formatClassTable";
import classTable from "@/components/classTable.vue";

const now = ref(0);
let weeks: any = [];

for (let i = 1; i <= 18; i++) {
  weeks.push({
    name: `第${i}周`,
    id: i,
  });
}
const toggleNow = (e: any) => {
  now.value = Number(e.id);
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
