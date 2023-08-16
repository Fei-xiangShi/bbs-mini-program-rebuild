<template>
  <view class="art-item" @tap="showDetail">
    <view class="article-container">
      <view class="article-components">
        <view class="title">{{ article.title }}</view>
        <view class="info">
          <view class="author">{{ article.author.name }}</view>
          <view class="date">{{ article.gmtCreate }}</view>
          <view class="comments">{{ article.commentCount }}</view>
        </view>
      </view>
      <view class="image-container">
        <img :src="article.thumbnailUrl" alt="Image" class="article-img" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import routes from "@/config/routes";

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const showDetail = () => {
  uni.navigateTo({
    url:
      routes.articleDetail.path +
      "?" +
      routes.articleDetail.query +
      "=" +
      props.article.id,
  });
};
</script>

<style lang="scss">
.article-container {
  border: 1px solid black;
  border-radius: 18px;
  margin-top: 10px;
  margin-left: 9px;
  display: flex;
  width: 90vw;
  height: 100px;
}

.article-components {
  width: 55vw;
  margin-left: 10px;
}

.title {
  margin-left: 15px;
  margin-top: 25px;
  font-size: 20px;
  font-weight: 700;
}

.info {
  display: flex;
  margin-top: 5px;
  width: 55vw;
}

.author {
  width: 15vw;
  text-align: center;
}

.date {
  width: 25vw;
}

.image-container {
  width: 30vw;
  height: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.article-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}
</style>
