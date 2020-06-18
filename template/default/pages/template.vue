<template>
  <view class="content">
    {{data1}}
  </view>
</template>

<script>
export default {
  data() {
    return {
      data1: '123',
    };
  },
  onLoad() {

  },
  methods: {
    onClick(){

    }
  },
  watch: {
    data1(v) {

    },
  },
  computed: {
    data2() {
      return 'data2'
    },
  },
};
</script>

<style lang="scss" scoped>
.content{
  color: inherit;
}
</style>
