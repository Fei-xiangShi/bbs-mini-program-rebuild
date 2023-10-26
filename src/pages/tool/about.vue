<template>
  <u-cell-group>
    <view v-for="item in RouteConfig.about">
      <u-cell
        :title="item.name"
        :icon="item.icon"
        :isLink="true"
        :url="item.path"
      />
    </view>
  </u-cell-group>
</template>

<script setup lang="ts">
import RouteConfig from "@/config/routes";
</script>
