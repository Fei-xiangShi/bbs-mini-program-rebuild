<template>
  <view
    :class="['refresh', { reloading: isRefreshing }]"
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
    <u-row customStyle="margin-bottom: 5px">
      <u-col span="0.8">
        <view class="month">{{ getMonthName(now) }}</view>
      </u-col>
      <u-col span="1.6" v-for="(day, index) in days" :key="index">
        <view class="weekday">{{ day.weekday }}</view>
        <view class="date">{{ day.date }}</view>
      </u-col>
    </u-row>
    <view class="classTable" v-for="item in briefList[now]">
      <view> {{ item }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Api from "@/public/api";
import { onLoad } from "@dcloudio/uni-app";
import formatClassTable from "@/utils/formatClassTable";
import semester from "@/config/semesterDuration";

const now = ref(1);
let weeks: any = [];

for (let i = 1; i <= 20; i++) {
  weeks.push({
    name: `第${i}周`,
    id: i,
  });
}
const toggleNow = (e: any) => {
  now.value = Number(e.id);
  generateDateRange(semester.start, semester.end);
};

const isRefreshing = ref(false);

const refreshClassTable = () => {
  isRefreshing.value = true;
  Api.getClassTable().then((res: any) => {
    uni.setStorageSync("classTable", res.data || []);
    briefList.value = formatClassTable();
  });
  isRefreshing.value = false;
};

let briefList = ref(uni.getStorageSync("courseByWeeks"));

const days = ref([{ date: 0, weekday: "" }]);

const getWeekdayName = (dayIndex: number) => {
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  return weekdays[dayIndex];
};

const getMonthName = (week: number) => {
  const startDate = new Date(semester.start);
  const currentWeekStartDate = new Date(
    startDate.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000
  );
  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];
  const monthIndex = currentWeekStartDate.getMonth();
  return monthNames[monthIndex];
};

const generateDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);

  days.value = [];
  const currentWeekStartDate = new Date(
    start.getTime() + (now.value - 1) * 7 * 24 * 60 * 60 * 1000
  );
  const end = new Date(
    currentWeekStartDate.getTime() + 7 * 24 * 60 * 60 * 1000
  );
  for (
    let current = currentWeekStartDate;
    current <= end && current <= new Date(endDate);
    current.setDate(current.getDate() + 1)
  ) {
    const date = current.getDate();
    const weekday = getWeekdayName(current.getDay());
    days.value.push({ date, weekday });
  }
};

onLoad(() => {
  if (briefList.value.length === 0) {
    refreshClassTable();
    briefList.value = formatClassTable();
  }
  const currentDate = Number(new Date());
  const startDate = Number(new Date(semester.start));
  const daysDiff = Math.floor(
    (currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)
  );
  const currentWeek = Math.max(1, Math.min(20, Math.floor(daysDiff / 7) + 1));

  now.value = currentWeek;
  generateDateRange(semester.start, semester.end);
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
        generateDateRange(semester.start, semester.end);
      }
    } else {
      if (now.value < 20) {
        now.value++;
        generateDateRange(semester.start, semester.end);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.weekday {
  height: 25px;
  background: #ced7e1;
  text-align: center;
  border: 1px solid #e5e9f2;
  line-height: 25px;
}

.month {
  height: 50px;
  background: #ced7e1;
  text-align: center;
  border: 1px solid #e5e9f2;
  line-height: 25px;
}
.date {
  height: 25px;
  background: #ced7e1;
  text-align: center;
  border: 1px solid #e5e9f2;
  line-height: 25px;
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
}

.reloading {
  animation: rotateAnimation 2s linear infinite;
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
