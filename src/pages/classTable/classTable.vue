<template>
  <view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }" />
  <view class="navBar">
    <view class="title">
      {{ currentDate }}
    </view>
  </view>
  <view class="body">
    <view
      class="refresh"
      :class="[isRefreshing ? 'reloading' : '']"
      @tap="refreshClassTable"
    >
      <u-icon name="reload" size="35" class="icon" />
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
        :current="now - 1"
      ></u-tabs>
    </view>
    <view
      class="class-table-item"
      @touchstart="touchStart"
      @touchend="touchEnd"
    >
      <view class="classTable">
        <classTable :tableItem="briefList[now]" :now="now" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Api from "@/public/api";
import { onLoad } from "@dcloudio/uni-app";
import formatClassTable from "@/utils/formatClassTable";
import classTable from "@/components/classTableItem.vue";
import RouteConfig from "@/config/routes";

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
const now = ref(1);
let weeks: any = [];

const currentDate = ref(formatDate(new Date()));

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

for (let i = 1; i <= 20; i++) {
  weeks.push({
    name: `第${i}周`,
    id: i,
  });
}
const toggleNow = (e: any) => {
  now.value = Number(e.id);
};

const isRefreshing = ref(false);

const refreshClassTable = () => {
  isRefreshing.value = true;
  Api.getClassTable().then((res: any) => {
    uni.setStorageSync("classTable", res.data || []);
    briefList.value = formatClassTable();
    isRefreshing.value = false;
    uni.reLaunch({
      url: RouteConfig.classTable.path,
    });
  });
};

let briefList = ref(uni.getStorageSync("courseByWeeks"));

onLoad(() => {
  if (briefList.value.length === 0) {
    refreshClassTable();
    briefList.value = formatClassTable();
  }
  
  now.value = uni.getStorageSync("currentWeek") || 1;
});
let startX = 0;
let startY = 0;

const touchStart = (e: any) => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
};

const touchEnd = (e: any) => {
  const touch = e.changedTouches[0];
  const deltaX = touch.clientX - startX;
  const deltaY = touch.clientY - startY;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      if (now.value > 1) {
        now.value--;
      }
    } else {
      if (now.value < 20) {
        now.value++;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin-left: 1rem;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.statusBar {
  width: 100%;
  height: 0;
  background-color: rgb(28, 167, 167);
}

.navBar {
  display: flex;
  align-items: center;
  background-color: rgb(28, 167, 167);
  color: #fff;
  height: 44px;
}

.refresh {
  position: fixed;
  display: flex;
  border: 2px solid;
  border-radius: 60px;
  width: 3.5rem;
  height: 3.5rem;
  bottom: 5%;
  right: 10%;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.reloading {
  animation: rotateAnimation 2s linear infinite;
  pointer-events: none;
}

.classTable {
  margin-bottom: 1rem;
  border-radius: 10px;
}

@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
