<template>
  <view class="reply-item">
    <view class="root">
      <view class="author">{{ reply.author.name }}</view>
      <view class="content">{{ reply.content }}</view>
      <u-button @tap="changeReplyBox" type="primary">回复</u-button>
    </view>
    <view class="sencondaryReply">
      <view v-for="secondaryReply in reply.replyList">
        <view class="author">{{ secondaryReply.author.name }}</view>
        <view> {{ secondaryReply.content }}</view>
      </view>
    </view>
  </view>
  <view class="replyToReply" v-if="showReplyBox">
    <view class="son">
      <form>
        <u-input
          v-model="newSecondaryReply.content"
          placeholder="请输入回复内容"
          maxlength="100"
        ></u-input>
      </form>
    </view>
    <view class="replyToReply">
      <u-button @tap="replyToReply">回复评论</u-button>
    </view>
  </view>
  <view>--------------------------------------------</view>
</template>

<script setup lang="ts">
import Api from "@/public/api";
import { reactive, ref } from "vue";
import Reply from "@/model/reply";

const props = defineProps({
  articleId: {
    type: Number,
    required: true,
  },
  reply: {
    type: Object,
    required: true,
  },
});

let showReplyBox = ref(false);
const changeReplyBox = () => {
  showReplyBox.value = !showReplyBox.value;
};

let newSecondaryReply = reactive(new Reply());

const replyToReply = () => {
  newSecondaryReply.rootReplyId = props.reply.id;
  newSecondaryReply.parentReplyId = props.reply.id;
  console.log(newSecondaryReply)
  let res = Api.reply(props.articleId, newSecondaryReply).then((res: any) => {
    console.log(res);
    if (res.statusCode === 200) {
      uni.showToast({
        title: "回复成功",
        icon: "none",
      });
    } else {
      uni.showToast({
        title: "回复失败: " + res.errMsg,
        icon: "none",
      });
    }
  });
};
</script>

<style lang="scss"></style>
