<template>
  <view class="class-table-header">
    <u-row customStyle="margin-bottom: 5px">
      <u-col span="0.8">
        <view class="month">{{ getMonthName(now) }}</view>
      </u-col>
      <u-col span="1.6" v-for="(day, index) in days" :key="index">
        <view class="weekday">{{ day.weekday }}</view>
        <view class="date">{{ day.date }}</view>
      </u-col>
    </u-row>
  </view>
  <view class="class-table-main">
    <u-row v-for="(time, y) in classArrangement" :key="y">
      <u-col span="0.8">
        <view class="month">{{ y }} {{ time }}</view>
      </u-col>
      <u-col span="1.6" v-for="(day, x) in days">
        <view class="class-detail" :class="[`x-${x}`, `y-${y - 1}`]">
          <view
            v-if="tableItem && tableItem[x + 1] && tableItem[x + 1][String(y)]"
            @tap="showDetails(tableItem[x + 1][String(y)])"
            >{{tableItem[x + 1][String(y)]["kcmc"]}}</view
          >
        </view>
      </u-col>
    </u-row>
    <u-popup
      :show="showDetail"
      mode="center"
      :round="10"
      :closeOnClickOverlay="true"
      @close="closeDetail"
      :closeable="true"
    >
      <view> COURSE DETAIL</view>
      <view>{{ show["kcmc"] }} {{ show["cdmc"] }}</view>
      <view>教师: {{ show["xm"] }}</view>
      <view>学分: {{ show["xf"] }}</view>
      <view>分类: {{ show["kcxz"] }}</view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import semester from "@/config/semesterDuration";
import classArrangement from "@/config/classArrangement";

const props = defineProps({
  tableItem: {
    type: Object,
    required: true,
  },
  now: {
    type: Number,
    required: true,
  },
});

watch(
  () => props.now,
  () => {
    generateDateRange(semester.start, semester.end);
  }
);

const showDetail = ref(false);
const show = ref({
  kcmc: "",
  cdmc: "",
  xm: "",
  xf: "",
  kcxz: "",
});
const days = ref([{ date: 0, weekday: "" }]);

const showDetails = (item: any) => {
  showDetail.value = true;
  show.value = item;
};

const closeDetail = () => {
  showDetail.value = false;
};

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
    start.getTime() + (props.now - 1) * 7 * 24 * 60 * 60 * 1000
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

onMounted(() => {
  generateDateRange(semester.start, semester.end);
});
</script>

<style lang="scss">
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
</style>
