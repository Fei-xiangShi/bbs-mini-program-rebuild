<template>
  <view class="content">
    <view class="navigation">
      <view class="nav-top"></view>
      <view class="nav-height">西大樟树林</view>
    </view>

    <view class="toolbox">
      <view class="grid-item">
        <view class="weather">欢迎回来, 卢本伟同学! 今天北碚0~100°C多云</view>
        <u-grid col="4">
          <u-grid-item v-for="(item, index) in RouteConfig.toolbox" @tap="">
            <u-icon :name="item.icon" size="22" />
            <view style="color: whitesmoke">{{ item.name }}</view>
          </u-grid-item>
        </u-grid>
      </view>
    </view>
    <view class="brief-classtable">
      <view>{{ classTime }}</view>
      <view>{{ className }}</view>
      <view>{{ classLocation }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import RouteConfig from "@/config/routes";
import classArrangement from "@/config/classArrangement";
import semester from "@/config/semesterDuration";

let menu_top = ref<string>("");
let menu_height = ref<string>("");
let currentClassIndex = ref<number>(-1);
let currentWeek = ref<number>(-1);
let classTime = ref<string>("");
let classLocation = ref<string>("");
let className = ref<string>("");

const currentTime = new Date();
const classTimes = Object.values(classArrangement).map((timeRange) => {
  const [start, end] = timeRange.split(" ");
  return { start, end };
});

const getBriefClassTable = () => {
  for (let i = 0; i < classTimes.length; i++) {
    const { start, end } = classTimes[i];
    const startTime = new Date(currentTime.toDateString() + " " + start);
    const endTime = new Date(currentTime.toDateString() + " " + end);

    if (currentTime >= startTime && currentTime <= endTime) {
      currentClassIndex.value = i;
      break;
    }
  }
  const currentDate = Number(new Date());
  const startDate = Number(new Date(semester.start));
  const daysDiff = Math.floor(
    (currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)
  );
  currentWeek.value = Math.max(1, Math.min(20, Math.floor(daysDiff / 7) + 1));
  uni.setStorageSync("currentWeek", currentWeek.value);
  if (currentClassIndex.value !== -1) {
    const { start, end } = classTimes[currentClassIndex.value];
    const currentWeekClassTable =
      uni.getStorageSync("classTable")[currentWeek.value];
    if ((className.value = currentWeekClassTable[currentClassIndex.value])) {
      classTime.value = `${start} - ${end}`;
      className.value = currentWeekClassTable[currentClassIndex.value].kcmc;
      classLocation.value = currentWeekClassTable[currentClassIndex.value].cdmc;
    } else {
      let nextclass = 0;
      currentWeekClassTable.forEach((element: any, index: number) => {
        if (index > currentClassIndex.value && nextclass == 0) {
          nextclass = index;
        }
      });
      if (nextclass != 0) {
        classTime.value = `${start} - ${end}`;
        className.value = currentWeekClassTable[nextclass].kcmc;
        classLocation.value = currentWeekClassTable[nextclass].cdmc;
      } else {
        classTime.value = "No class today";
        className.value = "今天一节课都没有了";
        classLocation.value = "明天的课会在24:00更新";
      }
    }
  } else {
    classTime.value = "No class today";
    className.value = "今天一节课都没有了";
    classLocation.value = "明天的课会在24:00更新";
  }
};

onMounted(() => {
  let menuButtonBoundingClientRect = uni.getStorageSync(
    "menuButtonBoundingClientRect"
  );
  menu_top.value = menuButtonBoundingClientRect.top + "px";
  menu_height.value = menuButtonBoundingClientRect.height + "px";
  getBriefClassTable();
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

.grid-item {
  padding-top: calc(v-bind(menu_top) + v-bind(menu_height) + 1rem);
}

.toolbox {
  width: 100%;
  height: 450rpx;
  background: #5488f0;
  background-size: 100% 100%;
}
</style>
