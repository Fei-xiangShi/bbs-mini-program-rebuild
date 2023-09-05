<template>
  <view class="class-table-header" ref="headerHeight">
    <u-row customStyle="margin-bottom: 5px">
      <u-col span="0.8">
        <view class="month">{{ getMonthName(now) }}</view>
        <view class="yue">月</view>
      </u-col>
      <u-col span="1.6" v-for="(day, index) in days" :key="index">
        <view
          class="date"
          :class="[day.weekday === getWeekdayName(currentDay) ? 'today' : '']"
          >{{ day.date }}</view
        >
        <view
          class="weekday"
          :class="[day.weekday === getWeekdayName(currentDay) ? 'today' : '']"
          >{{ day.weekday }}</view
        >
      </u-col>
    </u-row>
  </view>

  <view class="class-table-main">
    <view class="timelist">
      <u-col span="0.8" v-for="(time, y) in classArrangement">
        <view class="class-order">{{ y }}</view>
        <view class="time">{{ time }}</view>
      </u-col>
    </view>
    <view class="classlist" v-if="tableItem">
      <u-col span="1.6" v-for="(day, x) in days">
        <u-row
          v-if="tableItem[x + 1]"
          v-for="(time, y) in tableItem[x + 1]"
          :key="y"
        >
          <view
            class="class-detail"
            :class="[`class-${tableItem[x + 1][y]['kch']}`]"
            :style="{
              height:
                tableItem[x + 1][y]['jc'].length * 5.6 
                -
                (tableItem[x + 1][y + 1]
                  ? tableItem[x + 1][y]['jc'][
                      tableItem[x + 1][y]['jc'].length - 1
                    ] ===
                    tableItem[x + 1][y + 1]['jc'][0] - 1
                    ? 0.3
                    : 0
                  : 0)
                   +
                'vh',
              marginTop: tableItem[x + 1][y - 1]
                ? (tableItem[x + 1][y]['jc'][0] -
                    tableItem[x + 1][y - 1]['jc'][
                      tableItem[x + 1][y - 1]['jc'].length - 1
                    ] -
                    1) *
                    5.6 +
                  'vh'
                : 0,
                background: randomColor(tableItem[x + 1][y]['kch'])
            }"
          >
            <view @tap="showDetails(tableItem[x + 1][y])" class="classinfo">
              <view class="classname">{{
                `${tableItem[x + 1][y]["kcmc"]}`
              }}</view>
              <view class="block" />
              <view class="location">{{
                `${tableItem[x + 1][y]["cdmc"]}`
              }}</view>
            </view>
          </view>
        </u-row>
      </u-col>
    </view>
  </view>
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

const headerHeight = ref();
const showDetail = ref(false);
const show = ref({
  kcmc: "",
  cdmc: "",
  xm: "",
  xf: "",
  kcxz: "",
});
const days = ref([{ date: 0, weekday: "" }]);
const currentDay = new Date().getDay();
const colorList = [
  // 浅色系
  "rgba(255, 99, 71, 0.5)",
  "#FFA07A",
  "#FFD700",
  "#FFDEAD",
  "#FFE4E1",
  "#FFEFD5",
  "#AFEEEE",
  "#00FFFF",
  "#00BFFF",
  "#7FFFD4",
  "#FFB6C1",
  "rgba(255, 192, 203, 0.5)",
  "rgba(255, 0, 0, 0.2)",
  "rgba(0, 255, 255, 0.2)",
  "rgba(0, 191, 255, 0.2)",
  "rgba(127, 255, 212, 0.2)",
  "rgba(0, 255, 127, 0.2)",
  "rgba(0, 250, 154, 0.2)",
  "rgba(0, 255, 0, 0.2)",
  "rgba(173, 255, 47, 0.2)",
  "rgba(50, 205, 50, 0.2)",
  "rgba(255, 255, 0, 0.2)",
  "rgba(255, 215, 0, 0.2)",
  "rgba(255, 165, 0, 0.2)",
  "rgba(255, 140, 0, 0.2)",
  "rgba(255, 127, 80, 0.2)",
  "rgba(255, 99, 71, 0.2)",
  "rgba(255, 69, 0, 0.2)",
];

const randomColor = (kch: string) => {
  const index = Number(kch) % colorList.length;
  return colorList[index];
};


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
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
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
.month {
  font-size: smaller;
  text-align: center;
}

.yue {
  font-size: smaller;
  text-align: center;
}

.weekday {
  font-size: smaller;
  text-align: center;
}
.date {
  font-size: smaller;
  text-align: center;
}

.class-table-main {
  display: flex;
  flex-direction: row;
  height: 85vh;
}

.timelist {
  display: flex;
  flex-direction: column;
}

.classlist {
  display: flex;
  position: relative;
  left: 1.6rem;
}

.class-order {
  width: 1.6rem;
  text-align: center;
  font-weight: 500;
  font-size: small;
  height: 1rem;
}

.time {
  margin-left: 0.2rem;
  height: 1rem;
  font-weight: 400;
  font-size: 0.55rem;
}

.class-detail {
  display: flex;
  width: 95%;
  text-align: center;
  align-items: center;
  font-size: xx-small;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 8px;
  margin: 0.2rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.55);
  
}


.class-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 90%;
}

.block {
  height: 0.4rpx;
  background-color: #000000;
  opacity: 0.4;
  margin: 0.2rem;
}

.today {
  background-color: #cccfd6;
}
</style>
