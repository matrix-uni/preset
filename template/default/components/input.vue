<template>
  <mx-input :value="value" @input="onInput" />
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
