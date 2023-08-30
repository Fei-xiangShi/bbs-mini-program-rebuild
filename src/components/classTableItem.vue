<template>
  <view class="class-table-header" ref="headerHeight">
    <u-row customStyle="margin-bottom: 5px">
      <u-col span="0.8">
        <view class="month">{{ getMonthName(now) }}</view>
      </u-col>
      <u-col span="1.6" v-for="(day, index) in days" :key="index">
        <view
          class="weekday"
          :class="[day.weekday === getWeekdayName(currentDay) ? 'today' : '']"
          >{{ day.weekday }}</view
        >
        <view
          class="date"
          :class="[day.weekday === getWeekdayName(currentDay) ? 'today' : '']"
          >{{ day.date }}</view
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
            v-if="tableItem[x + 1][y]"
            class="class-detail"
            :class="[`x-${x}`, `y-${y}`]"
            :style="{
              height: tableItem[x + 1][y]['jc'].length * 6.6 + 'vh',
              marginTop: tableItem[x + 1][y - 1]
                ? (tableItem[x + 1][y]['jc'][0] -
                    tableItem[x + 1][y - 1]['jc'][
                      tableItem[x + 1][String(y - 1)]['jc'].length - 1
                    ] -
                    1) *
                    6.6 +
                  'vh'
                : 0,
            }"
          >
            <view @tap="showDetails(tableItem[x + 1][y])">{{
              `${tableItem[x + 1][y]["kcmc"]}\n@${
                tableItem[x + 1][y]["cdmc"]
              }\n${tableItem[x + 1][y]["xm"]}`
            }}</view>
          </view>
        </u-row>
      </u-col>
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
.month {
  text-align: center;
}
.weekday {
  text-align: center;
}
.date {
  text-align: center;
}

.class-table-main {
  display: flex;
  flex-direction: row;
  height: 100vh;
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
  display: flex;
  font-weight: 600;

  font-size: small;
  height: 1rem;
}

.time {
  height: 1rem;
  font-weight: 400;
  font-size: 0.55rem;
  text-align: center;
}

.class-detail {
  height: 2.8rem;
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.today {
  background-color: #e5e9f2;
}
</style>
