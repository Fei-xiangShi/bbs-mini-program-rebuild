<template>
  <view class="publish">
    <view class="title">
      <u-input class="title" placeholder="标题" v-model="article.title" />
    </view>
    <view class="content">
      <u-textarea
        class="content"
        placeholder="分享新鲜事"
        v-model="article.content"
        maxlength="10000"
        count
        confirm-type="完成"
      />
    </view>
    <view class="thumbnail">
      <u-input
        class="content"
        placeholder="头图链接"
        v-model="article.thumbnailUrl"
      />
    </view>
  </view>
  <view class="visibility">
    <view>设置可见性</view>
    <u-radio-group v-model="article.visibility">
      <u-radio label="可见" @change="article.visibility = 1" name="1" />
      <u-radio label="不可见" @change="article.visibility = 0" name="0" />
    </u-radio-group>
  </view>
  <view class="set-category">
    <u-picker
      :show="showPicker"
      title="选择分类"
      :columns="categories"
      closeOnClickOverlay
      @close="togglePicker"
      @confirm="chooseCategory"
      @cancel="togglePicker"
      keyName="name"
    ></u-picker>
    <u-button @tap="togglePicker">选择分类</u-button>
  </view>
  <view>
    <u-button class="primary" @tap="publish">{{
      article.id ? "修改" : "发布"
    }}</u-button>
  </view>
</template>

<script setup lang="ts">
import Api from "@/public/api";
import Ariticle from "@/model/article";
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive } from "vue";
import routes from "@/config/routes";

let article = ref(new Ariticle());
const showPicker = ref(false);
const categories = reactive([
  uni.getStorageSync("menu").filter((category: { name: string }) => {
    return category.name !== "热门";
  }),
]);
const togglePicker = () => {
  showPicker.value = !showPicker.value;
};

const chooseCategory = (e: any) => {
  article.value.category = e.values[0][0].id;
  togglePicker();
};

const publish = () => {
  if (!checkArticleValidation()) {
    return;
  }
  article.value.status = 0;
  Api.publishArticle(article.value).then((res: any) => {
    if (res.statusCode === 200) {
      uni.showToast({
        title: "发布成功",
        icon: "none",
      });
      uni.reLaunch({ url: routes.bbs.path });
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
    article.value.content.length > 10000
  ) {
    uni.showToast({
      title: "内容长度应在10-10000个字符之间",
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

<style lang="scss">
.publish {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  .title {
    width: 100%;
    margin-bottom: 20px;
  }
  .content {
    width: 100%;
    margin-bottom: 20px;
  }
  .thumbnail {
    width: 100%;
    margin-bottom: 20px;
  }
}

.primary {
  margin: 20px;
}
</style>
