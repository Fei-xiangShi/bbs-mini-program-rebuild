<template>
  <view class="art-item" @tap="showDetail">
    <view class="article-container">
      <view class="article-components">
        <view class="title">
          <u-text :text="article.title" :lines="1" :size="25" :bold="true" />
        </view>
        <view class="info">
          <view class="author">
            <u-text
              :text="article.author.name"
              prefixIcon="account"
              :lines="1"
            />
          </view>

          <view class="date">
            <u-text text="2023年8月18日" prefixIcon="order" :lines="1" />
          </view>

          <view class="comments-count" v-if="!article.thumbnailUrl">
            <u-text :text="article.commentCount" prefixIcon="chat" :lines="1" />
          </view>

          <view class="like-count" v-if="!article.thumbnailUrl">
            <u-text
              :text="article.likeCount"
              prefixIcon="thumb-up"
              :lines="1"
            />
          </view>
        </view>
      </view>
      <view class="image-container" v-if="article.thumbnailUrl">
        <u-image
          :src="article.thumbnailUrl"
          alt="Image"
          class="article-img"
          width="5rem"
          height="4rem"
          radius="1rem"
        />
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
  box-shadow: 0 0 0.4rem 0.2rem rgb(0 0 0 / 10%);
  border-radius: 18px;
  margin-top: 1rem;
  margin-left: 0.6rem;
  margin-bottom: 1.2rem;
  display: flex;
  width: 90vw;
  height: 5rem;
}

.article-components {
  margin-left: 0.5rem;
}

.title {
  margin-top: 0.6rem;
  margin-left: 0.6rem;
  width: 92%;
}
.info {
  display: flex;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
}
.author {
  width: 5rem;
}

.date {
  margin-left: 0.8rem auto;
  width: 10rem auto;
}

.comments-count {
  margin-left: 1rem;
}

.like-count {
  margin-left: 1rem;
  margin-right: 1rem auto;
}

.image-container {
  margin-right: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: auto;
}
</style>
