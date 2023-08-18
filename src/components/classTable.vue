<template>
  <u-row customStyle="margin-bottom: 5px">
    <u-col span="0.8">
      <view class="demo-layout bg-purple-light">时间</view>
    </u-col>
    <u-col span="1.6">
      <view class="demo-layout bg-purple-light">1</view>
    </u-col>
    <u-col span="1.6">
      <view class="demo-layout bg-purple">2</view>
    </u-col>
    <u-col span="1.6">
      <view class="demo-layout bg-purple">3</view>
    </u-col>
    <u-col span="1.6">
      <view class="demo-layout bg-purple">4</view>
    </u-col>
    <u-col span="1.6">
      <view class="demo-layout bg-purple">5</view>
    </u-col>
    <u-col span="1.6">
      <view class="demo-layout bg-purple">6</view>
    </u-col>
    <u-col span="1.6">
      <view class="demo-layout bg-purple">7</view>
    </u-col>
  </u-row>
</template>

<script setup lang="ts">
const props = defineProps({
  classTable: {
    default: [],
  },
});
</script>

<style lang="scss">
.demo-layout {
  height: 25px;
  border-radius: 4px;
}

.bg-purple {
  background: #ced7e1;
}

.bg-purple-light {
  background: #e5e9f2;
}
</style>
