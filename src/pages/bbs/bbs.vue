<template>
  <navbar :isViewing="isViewing" class="navbar" @openSidebar="toggleStyle" />
  <view class="navToAriticlePublishPage" @tap="navToArticlePublishPage"
    ><u-text>+</u-text></view
  >
  <u-back-top :scrollTop="0" top="20px"></u-back-top>
  <view class="search-bar">
    <u-search
      placeholder="查找标题或作者"
      class="header-search-bar"
      @search="searchPassage"
      :animation="true"
    />
  </view>
  <view :class="body">
    <view class="article-box">
      <articleItem
        v-for="item in artList.list"
        :key="item.id"
        :article="item"
      ></articleItem>
    </view>
    <u-loadmore
      loadmoreText="看, 我和别人不一样"
      color="#1CD29B"
      lineColor="#1CD29B"
      dashed
      line
    />
  </view>
</template>

<script setup lang="ts">
import articleItem from "@/components/articleItem.vue";
import Api from "@/public/api";
import { onLoad, onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app";
import { reactive, onMounted, ref } from "vue";
import { ArticleList } from "@/model/articleList";
import navbar from "@/components/navbar.vue";
import routes from "@/config/routes";
import ResponseCheck from "@/utils/responseCheck";

let isSearching = false;
let isViewing = uni.getStorageSync("isViewing");
let body = ref("fuck");

const toggleStyle = (open: any) => {
  if (open) {
    body.value = "doNotFuck";
  } else {
    body.value = "fuck";
  }
};

const navToArticlePublishPage = () => {
  uni.navigateTo({
    url: routes.articlePublish.path,
  });
};

const artList = reactive(new ArticleList());

const concatenatingArticleList = (response: any) => {
  response.then((res: any) => {
    uni.stopPullDownRefresh();
    if (res.data && res.data.length > 0) {
      //每次请求页数加一
      artList.page++;
      artList.list = [...artList.list, ...res.data];
      return;
    }
    uni.showToast({
      title: "没有更多了",
      icon: "none",
    });
  });
};

const searchPassage = (e: string | number) => {
  if (!e) {
    uni.showToast({
      title: "请输入关键字",
      icon: "none",
    });
    return;
  }
  isSearching = true;
  artList.list = [];
  artList.page = 1;
  uni.setStorageSync("isViewing", e);
  let response = null;
  if (!isNaN(Number(e))) {
    response = Api.searchArticle("BY_ID", e, artList.page);
  } else {
    response = Api.searchArticle("BY_AUTHOR_OR_TITLE", e, artList.page);
  }
  ResponseCheck.resIsSuccess(response);
  concatenatingArticleList(response);
};

const getCategoryArticle = (category: number) => {
  let response = Api.getArticleListByCategory(category, artList.page);
  ResponseCheck.resIsSuccess(response);
  concatenatingArticleList(response);
};

const getlist = (getWhat: number | string) => {
  if (isSearching) {
    searchPassage(getWhat);
  } else {
    getCategoryArticle(Number(getWhat));
  }
};
onLoad(() => {
  isSearching = false;
  isViewing = uni.getStorageSync("isViewing");
  artList.list = [];
  artList.page = 1;
  getlist(isViewing);
});

onReachBottom(() => {
  isViewing = uni.getStorageSync("isViewing");
  getlist(isViewing);
});

onPullDownRefresh(() => {
  isViewing = uni.getStorageSync("isViewing");
  artList.list = [];
  artList.page = 1;
  getlist(isViewing);
});

onMounted(() => {
  isSearching = false;
});
</script>

<style lang="scss" scoped>
.doNotFuck {
  position: fixed;
}

.search-bar {
  margin: 0 auto;
  padding: 10upx;

}

.article-box {
  width: 95%;
  margin: 0 auto;
  padding: 10upx;
  align-items: center;
}
.navToAriticlePublishPage {
  background: linear-gradient(
    to bottom right,
    rgba(#b39cd0, 0.5),
    rgba(#00c9a7, 0.3),
    rgba(#c4fcef, 0.5)
  );
  position: fixed;
  bottom: 5%;
  right: 10%;
  font-size: 50px;
  vertical-align: middle;
  width: 3.5rem;
  height: 3.5rem;
  border: 2px solid;
  border-radius: 60px;
  z-index: 999;
  ::before,
  ::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
  }
  ::before {
    width: 20px;
    border-top: 4px solid;
    margin: -2px 0 0 -10px;
  }
  ::after {
    height: 20px;
    border-left: 4px solid;
    margin: -10px 0 0 -2px;
  }
}
</style>
