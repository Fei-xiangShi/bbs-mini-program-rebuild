<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import initUser from "./utils/initUser";
import formatClassTable from "./utils/formatClassTable";
import Api from "./public/api";
onLaunch(() => {
  let safetop = uni.getStorageSync("menuButtonBoundingClientRect");
  if (!safetop) {
    safetop = uni.getMenuButtonBoundingClientRect();
    uni.setStorageSync("menuButtonBoundingClientRect", safetop);
  }
  initUser();
  console.log("App Launch");
  const currentTime = new Date();
  if (!uni.getStorageSync("weather") || !uni.getStorageSync("weather").daily) {
    Api.getWeather().then((res: any) => {
      uni.setStorageSync("weather", res.data.result.daily);
    });
  } else {
    const storedTime = new Date(
      uni.getStorageSync("weather").precipitation[0].date
    );
    if (
      currentTime.getMonth() !== storedTime.getMonth() &&
      currentTime.getDate() !== storedTime.getDate()
    ) {
      Api.getWeather().then((res: any) => {
        uni.setStorageSync("weather", res.data.result.daily);
      });
    }
  }
});
onShow(() => {
  console.log("App Show");
  if (
    !uni.getStorageSync("classTable") ||
    !uni.getStorageSync("courseByWeeks")
  ) {
    Api.getClassTable().then((res: any) => {
      uni.setStorageSync("classTable", res.data || []);
      formatClassTable();
    });
  }
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
@import "../node_modules/uview-plus/index.scss";
</style>
