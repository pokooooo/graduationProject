<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("pullUpLoad");
    });
  },
  methods: {
    finishPullUp() {
      this.scroll.finishPullUp();
      this.scroll.refresh();
    },
    refresh() {
      this.scroll.refresh();
    },
  },
};
</script>

<style scoped></style>
