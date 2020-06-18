<template>
  <view class="input-wrapper">
    <mx-input :value="value" @input="onInput" />
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    onInput(e) {
      this.$emit("input", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  margin: 50rpx 100rpx;
  padding: 10rpx;
  background-color: #f7f7f7;
  border: 2rpx solid #eee;
}
</style>
