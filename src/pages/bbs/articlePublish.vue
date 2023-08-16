<template>
  <form class="passage" @submit="publish">
    <view class="publish">
      <u-input
        class="title"
        placeholder="标题"
        v-model="article.title"
      ></u-input>
      <u-input
        class="content"
        placeholder="内容"
        v-model="article.content"
      ></u-input>
      <u-input
        class="content"
        placeholder="图片链接"
        v-model="article.thumbnailUrl"
      ></u-input>
    </view>
    <view>
      <u-button class="primary" @tap="publish">{{
        article.id ? "修改" : "发布"
      }}</u-button>
    </view>
  </form>
</template>

<script setup lang="ts">
import Api from "@/public/api";
import Ariticle from "@/model/article";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import routes from "@/config/routes";

let article = ref(new Ariticle());

const publish = () => {
  if (!checkArticleValidation()) {
    return;
  }
  article.value.visibility = 1;
  article.value.category = 2
  article.value.status = 0;
  Api.publishArticle(article.value).then((res: any) => {
    console.log(article.value);
    if (res.statusCode === 200) {
      uni.showToast({
        title: "发布成功",
        icon: "none",
      });
      uni.reLaunch({url: routes.bbs.path});
      
    }
  });
};

const checkArticleValidation = () => {
  if (!article.value.title) {
    uni.showToast({
      title: "标题不能为空",
      icon: "none",
    });
    return false;
  }
  if (!article.value.content) {
    uni.showToast({
      title: "内容不能为空",
      icon: "none",
    });
    return false;
  }
  if (article.value.title.length < 5 || article.value.title.length > 50) {
    uni.showToast({
      title: "标题长度应在5-50个字符之间",
      icon: "none",
    });
    return false;
  }
  if (
    article.value.content.length < 10 ||
    article.value.content.length > 2000
  ) {
    uni.showToast({
      title: "内容长度应在10-2000个字符之间",
      icon: "none",
    });
    return false;
  }
  return true;
};

onLoad((option) => {
  article.value.id = option?.articleId;
  if (article.value.id) {
    Api.getArticleById(article.value.id).then((res: any) => {
      if (res.statusCode === 200) {
        article.value = res.data;
      } else {
        uni.showToast({
          title: "获取文章失败: " + res.data,
          icon: "none",
        });
      }
    });
  }
});
</script>

<style lang="scss"></style>
