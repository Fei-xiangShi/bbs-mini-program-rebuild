<template>
  <view class="content">
    <view class="navigation">
      <view class="nav-top"></view>
      <view class="nav-height">西大樟树林</view>
    </view>

    <view class="toolbox">
      <view class="grid-item">
        <view class="weather"
          >欢迎回来! 今天西南大学{{ showWeatherText }}</view
        >
        <u-grid col="4">
          <u-grid-item
            v-for="(item, index) in RouteConfig.toolbox"
            @tap="navTo(item.path)"
          >
            <u-icon :name="item.icon" size="22" />
            <view style="color: whitesmoke">{{ item.name }}</view>
          </u-grid-item>
        </u-grid>
      </view>
    </view>
    <view class="brief-classtable">
      <view class="classStatus">{{ classStatus }}</view>
      <view class="classTime">{{ classTime }}</view>
      <view class="className">{{ className }}</view>
      <view class="classLocation">{{ classLocation }}</view>
    </view>
    <view class="to-do-list">
      <toDoList />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import RouteConfig from "@/config/routes";
import semester from "@/config/semesterDuration";
import { weatherName } from "@/config/weatherName";
import toDoList from "@/components/toDoList.vue";

let menu_top = ref<string>("");
let menu_height = ref<string>("");
let currentClassIndex = ref<number>(-1);
let currentWeek = ref<number>(-1);
let classTime = ref<string>("");
let classLocation = ref<string>("");
let className = ref<string>("");
let classStatus = ref<string>("");

const currentTime = new Date();
const weather = uni.getStorageSync("weather");
const temperature =
  weather.temperature[0].min + "-" + weather.temperature[0].max + "℃ ";
const weatherText =
  weatherName[weather.skycon_08h_20h[0].value as keyof typeof weatherName] ==
  weatherName[weather.skycon_20h_32h[0].value as keyof typeof weatherName]
    ? weatherName[weather.skycon_08h_20h[0].value as keyof typeof weatherName]
    : weatherName[weather.skycon_08h_20h[0].value as keyof typeof weatherName] +
      "转" +
      weatherName[weather.skycon_20h_32h[0].value as keyof typeof weatherName];

const showWeatherText = temperature + weatherText;

const getBriefClassTable = () => {
  const courses = uni.getStorageSync("courseByWeeks");
  const currentDate = Number(currentTime);
  const currentDay = currentTime.getDay();
  const semesterStart = Number(new Date(semester.start));
  const daysDiff = Math.floor(
    (currentDate - semesterStart) / (7 * 24 * 60 * 60 * 1000)
  );
  currentWeek.value = Math.max(0, Math.min(20, Math.floor(daysDiff / 7) + 1));
  uni.setStorageSync("currentWeek", currentWeek.value);
  if (courses[currentWeek.value] && courses[currentWeek.value][currentDay]) {
    const todayCourses = courses[currentWeek.value][currentDay];
    for (let i = 0; i < todayCourses.length; i++) {
      const end = todayCourses[i].end;
      const classEndTime = new Date(currentTime.toDateString() + " " + end);
      if (currentTime <= classEndTime) {
        currentClassIndex.value = i;
        break;
      }
    }
  }

  if (currentClassIndex.value !== -1) {
    const { start, end } = {
      start:
        courses[currentWeek.value][currentDay][currentClassIndex.value].start,
      end: courses[currentWeek.value][currentDay][currentClassIndex.value].end,
    };
    const todayCourses = courses[currentWeek.value][currentDay];
    const classStartTime = new Date(currentTime.toDateString() + " " + start);
    if (currentTime >= classStartTime) {
      classStatus.value = "正在上课喵~";
    } else {
      classStatus.value = "下一节课~";
    }
    classTime.value = `${start} - ${end}`;
    className.value = todayCourses[currentClassIndex.value].kcmc;
    classLocation.value = todayCourses[currentClassIndex.value].cdmc;
  } else {
    classStatus.value = "今天没课啦";
    classTime.value = "好好休息吧~";
    className.value = "今天一节课都没有了";
    classLocation.value = "明天的课会在24:00更新";
  }
};

const navTo = (url: string) => {
  uni.navigateTo({
    url,
  });
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
  font-size: 3vh;
  color: #ffffff;
  font-weight: bold;
}

.grid-item {
  padding-top: calc(v-bind(menu_top) + v-bind(menu_height) + 2vh);
}

.weather {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0 10rpx 20rpx 20rpx;
  height: 2rem;
  font-size: 1rem;
  color: #ffffff;
  border-radius: 6px;
  background: #6f9dfa;
}

.toolbox {
  width: 100%;
  height: 15rem;
  background: #5488f0;
  background-size: 100% 100%;
}

.brief-classtable {
  font-size: 2vh;
  height: 13vh;
  background: #76490f;
  background-size: 100% 100%;
  margin: 20rpx;
  border-radius: 10px;
  padding: 20rpx;
}

.classStatus {
  right: 40rpx;
  position: absolute;
  color: #000000;
  margin-bottom: 20rpx;
}

.classTime {
  position: absolute;
  left: auto;
  color: #000000;
  margin-bottom: 20rpx;
}

.className {
  text-align: center;
  font-size: 3.5vh;
  color: #000000;
  margin-top: 4vh;
}

.classLocation {
  left: auto;
  margin-top: 2vh;
  color: #000000;
}
</style>
