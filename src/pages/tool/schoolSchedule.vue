<template>
  <view class="schoolSicheduleImg" @tap="navBack">
    <image src="../../static/images/schoolSchedule/校历.jpg" mode="widthFix" />
  </view>
</template>

<script setup lang="ts">

const navBack = () => {
  uni.navigateBack({
    delta: 1,
  });
};
</script>

<style lang="scss" scoped>
.schoolSicheduleImg {
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
