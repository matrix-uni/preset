<template>
  <view class="content">
    <image class="logo" src="/static/logo.svg"></image>
    <view class="title">
      <text>Hello, {{ title }}</text>
    </view>
    <mx-button @click="onClick">开始</mx-button>
    <pro-input v-model="title" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Matrix",
    };
  },
  onLoad() {},
  methods: {
    onClick() {
      this.title = "Matrix";
    },
  },
};
</script>

<style>
.content {
  text-align: center;
  height: 400rpx;
}

.logo {
  height: 200rpx;
  width: 400rpx;
  margin-top: 200rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
  margin-bottom: 30rpx;
}
</style>
