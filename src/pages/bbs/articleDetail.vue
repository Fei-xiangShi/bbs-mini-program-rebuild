<template>
  <view class="image-container" v-if="article.thumbnailUrl">
    <u-image
      :src="article.thumbnailUrl"
      :lazy-load="true"
      mode="aspectFill"
      width="100%"
    />
  </view>
  <view class="article">
    <view class="title-content">
      <view class="title">{{ article.title }}</view>
      <view class="author">
        <view class="avatar">
          <u-image
            :src="article.author.avatarUrl"
            :lazy-load="true"
            shape="circle"
            width="30px"
            height="30px"
          />
        </view>
        <view>{{ article.author.name }}</view>
        <view class="view-count">
          <view>{{ article.viewCount }} 次阅读</view>
        </view>
      </view>
    </view>
    <view class="content">
      <uaMarkdown :source="article.content" />
    </view>
    <view class="time"> 发布于 {{ createTime }} </view>

    <view class="tab">
      <view class="modify">
        <u-text
          @tap="navToArticlePublishPage"
          v-if="canModify"
          text="修改"
          prefixIcon="edit-pen"
        />
      </view>
      <view class="like">
        <u-text
          @tap="like"
          text="点赞"
          :prefixIcon="!likeStatus ? 'thumb-up' : 'thumb-up-fill'"
        />
      </view>
    </view>
  </view>

  <view class="reply-list">
    <ReplyItem
      v-for="(reply, index) in replyList.list"
      :key="reply.id"
      :reply="reply"
      :articleId="Number(articleId)"
      :index="index"
    />
  </view>
  <view class="comment">
    <form>
      <u-textarea
        placeholder="请输入评论内容"
        v-model="reply.content"
        count
        autoHeight
        maxlength="1000"
      />
      <view class="submit" @tap="commitReply">提交</view>
    </form>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import routes from "@/config/routes";
import Api from "@/public/api";
import Article from "@/model/article";
import { ref, reactive } from "vue";
import Reply from "@/model/reply";
import ReplyList from "@/model/replyList";
import ReplyItem from "@/components/replyItem.vue";
import uaMarkdown from "@/components/ua-markdown/ua-markdown.vue";

const reply = ref(new Reply());
const likeStatus = ref(false);
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
  likeStatus.value = !likeStatus.value;
  Api.likeArticle(articleId).then((res: any) => {
    if (res.statusCode === 200) {
      if (likeStatus.value) {
        uni.showToast({
          title: "点赞成功",
          icon: "none",
        });
      } else {
        uni.showToast({
          title: "取消点赞成功",
          icon: "none",
        });
      }
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
      title: "没有更多评论了",
      icon: "none",
    });
  });
};
const createTime = ref("");
let canModify = ref(false);
onLoad((option) => {
  articleId = option?.articleId;
  Api.getArticleById(articleId).then((res: any) => {
    if (res.statusCode === 200) {
      article.value = res.data;
      canModify.value =
        uni.getStorageSync("user").id === article.value.author.id;
      createTime.value = new Date(article.value.gmtCreate).toLocaleString(
        "zh-CN",
        { year: "numeric", month: "long", day: "numeric" }
      );
    } else {
      uni.showToast({
        title: "获取文章失败: " + res.data,
        icon: "none",
      });
    }
  });
  getReplyList();
  Api.getLikeArticleStatus(articleId).then((res: any) => {
    if (res.statusCode === 200) {
      likeStatus.value = res.data;
    } else {
      uni.showToast({
        title: "获取点赞状态失败: " + res.data,
        icon: "none",
      });
    }
  });
});

onReachBottom(() => {
  getReplyList();
});
</script>

<style lang="scss">
.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.article {
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .title-content {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    .title {
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      color: #303133;
    }
    .author {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: medium;
      color: rgb(131, 129, 126);
      .avatar {
        margin-right: 10px;
      }
    }
    .view-count {
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .content {
    margin: 10px;
    font-size: large;
  }
  .time {
    margin: 10px;
    font-size: small;
    color: rgb(131, 129, 126);
  }
}

.tab {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  .modify {
    margin-right: 10px;
  }
}

.reply-list {
  padding: 10px;
}

.comment {
  margin: 1rem;
  .submit {
    margin: 1rem;
    text-align: center;
    color: #979191;
    border: 1px solid #c9c5c5;
    border-radius: 20px;
    padding: 10px;
  }
}
</style>
