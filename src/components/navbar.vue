<template>
  <view class="navBarBox">
    <!-- 状态栏占位 -->
    <view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }" />
    <!-- 真正的导航栏内容 -->

    <view class="navBar">
      <view class="open-side-bar" @tap="toggleSidebar">
        <image
          class="sidebar-icon"
          src="/static/icons/navbar/菜单.png"
          mode="scaleToFill"
        />
      </view>
      <view class="title-content">
        <image
          class="title-icon"
          src="/static/icons/navbar/西大樟树林logo.png"
          v-if="!Number(isViewing)"
        />
        <u-text v-else class="title-text" :text="title" />
      </view>
    </view>
  </view>
  <view class="sidebar" v-if="showSidebar">
    <view class="sidebar-title">你好</view>
    <view class="menu">
      <scroll-view scroll-y="true" style="height: 100%">
        <view
          v-for="item in menuList"
          :key="item.id"
          class="menu-item"
          :id="item.id"
          @tap="changeCategory"
          >{{ item.name }}区</view
        >
      </scroll-view>
    </view>
  </view>

  <view
    @tap="toggleSidebar"
    class="drawer"
    v-if="showSidebar"
    @touchmove.stop.prevent="true"
  ></view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import routes from "@/config/routes";
import { onHide } from "@dcloudio/uni-app";

const emit = defineEmits(["openSidebar"]);

const props = defineProps({
  isViewing: {
    default: "",
  },
});

let menuList = uni.getStorageSync("menu") || [];
let title = ref("");

const changeCategory = (e: any) => {
  uni.setStorageSync("isViewing", e.target.id);
  uni.reLaunch({
    url: routes.bbs.path,
  });
};

let statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
const showSidebar = ref(false);
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
  emit("openSidebar", showSidebar.value);
};

onMounted(() => {
  menuList.forEach((item: any) => {
    if (item.id === Number(props.isViewing)) {
      title.value = item.name;
    }
  });
});

onHide(() => {
  showSidebar.value = false;
});
</script>

<style lang="scss">
.statusBar {
  width: 100%;
  height: 0;
  background-color: rgb(28, 167, 167);
}

.navBarBox .navBar {
  display: flex;
  align-items: center;
  background-color: rgb(28, 167, 167);
  color: #fff;
  height: 44px;
}

.navBarBox .navBar .title-content {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
}

.navBarBox .navBar .title-content .title-icon {
  width: 8rem;
  height: 2rem;
}

.navBarBox .navBar .title-content .title-text {
  margin-right: 10rem;
}

.navBarBox .navBar .open-side-bar {
  margin-left: 10rpx;
  width: 2rem;
  height: 2rem;
}

.navBarBox .navBar .open-side-bar .sidebar-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sidebar {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background-color: #fff;
  left: 0;
  z-index: 30;
  animation: sidebar 0.4s;
  overflow-x: auto;
  -webkit-animation: sidebar 0.4s;
}

@keyframes sidebar {
  0% {
    -webkit-transform: translate3d(-100%, 0, 0);
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    -webkit-transform: none;
    transform: none;
  }
}

@-webkit-keyframes sidebar {
  0% {
    -webkit-transform: translate3d(-100%, 0, 0);
  }
  100% {
    -webkit-transform: none;
  }
}

.sidebar-title {
  margin-top: 2rem;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
}

.sidebar .menu {
  overflow: scroll;
  height: calc(100% - 4rem - v-bind(statusBarHeight));
}

.sidebar .menu .menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  text-align: center;
  font-size: 1rem;
  border-bottom: 1px solid #eee;
}

.drawer {
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: gray;
  z-index: 20;
  opacity: 0.6;
  overflow: hidden;
}
</style>
