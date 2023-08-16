<template>
  <view class="image-container">
    <img :src="article.thumbnailUrl" alt="Image" />
  </view>
  <view class="article">
    <view class="title">{{ article.title }}</view>
    <view class="content">{{ article.content }}</view>
    <u-button @tap="navToArticlePublishPage" v-if="canModify">修改</u-button>
  </view>
  <view class="like">
    <u-button @tap="like">点赞</u-button>
  </view>
  <view>-----------------------</view>
  <view class="reply-list">
    <ReplyItem
      v-for="reply in replyList.list"
      :key="reply.id"
      :reply="reply"
      :articleId="Number(articleId)"
    />
  </view>
  <view>
    <u-button @tap="getReplyList">加载更多</u-button>
  </view>
  <view class="comment">
    <form>
      <textarea placeholder="请输入评论内容" v-model="reply.content"></textarea>
      <button type="submit" @tap="commitReply">提交</button>
    </form>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import routes from "@/config/routes";
import Api from "@/public/api";
import Article from "@/model/article";
import { ref, reactive } from "vue";
import Reply from "@/model/reply";
import ReplyList from "@/model/replyList";
import ReplyItem from "@/components/replyItem.vue";

const reply = ref(new Reply());
const commitReply = () => {
  Api.reply(articleId, reply.value).then((res: any) => {
    if (res.statusCode === 200) {
      uni.showToast({
        title: "评论成功",
        icon: "none",
      });
      replyList.list = [];
      replyList.page = 1;
      getReplyList();
      reply.value.content = "";
    } else {
      uni.showToast({
        title: "评论失败: " + res.errMsg,
        icon: "none",
      });
    }
  });
};

const navToArticlePublishPage = () => {
  uni.navigateTo({
    url:
      routes.articlePublish.path +
      "?" +
      routes.articlePublish.query +
      "=" +
      articleId,
  });
};

const like = () => {
  Api.likeArticle(articleId).then((res: any) => {
    if (res.statusCode === 200) {
      uni.showToast({
        title: "点赞成功",
        icon: "none",
      });
    } else {
      uni.showToast({
        title: "点赞失败: " + res.data,
        icon: "none",
      });
    }
  });
};

let articleId = 0;
let article = ref(new Article());
const replyList = reactive(new ReplyList());

const getReplyList = () => {
  let res = Api.getReplyList(articleId, replyList.page);
  concatenatingReplyList(res);
};

const concatenatingReplyList = (response: any) => {
  response.then((res: any) => {
    uni.stopPullDownRefresh();
    if (res.data && res.data.length > 0) {
      //每次请求页数加一
      replyList.page++;
      replyList.list = [...replyList.list, ...res.data];
      return;
    }
    uni.showToast({
      title: "没有更多了",
      icon: "none",
    });
  });
};

let canModify = ref(false);
onLoad((option) => {
  articleId = option?.articleId;
  Api.getArticleById(articleId).then((res: any) => {
    if (res.statusCode === 200) {
      article.value = res.data;
      canModify.value =
        uni.getStorageSync("user").id === article.value.author.id;
    } else {
      uni.showToast({
        title: "获取文章失败: " + res.data,
        icon: "none",
      });
    }
  });
  getReplyList();
});
</script>

<style lang="scss"></style>
