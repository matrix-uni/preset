<template>
  <view class="content">
    <image class="logo" src="/static/logo.svg"></image>
    <view class="title">
      <text>Hello, {{ title }}</text>
    </view>
    <mx-button>开始</mx-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Matrix',
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style>
.content {
  text-align: center;
  height: 400rpx;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
  margin-bottom: 30rpx;
}
</style>
