<template>
  <div class="smart-gesture-wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import smartGesture from 'smart-gesture';

  export default {
    components: {},

    props: {
      enablePath: { type: Boolean },
      timeDelay: { type: Number },
      lineColor: { type: String },
      lineWidth: { type: Number },
      triggerMouseKey: { type: String },
      activeColor: { type: String },
    },

    data () {
      return {};
    },

    computed: {
      options() {
        return {
          enablePath: this.enablePath,
          timeDelay: this.timeDelay,
          lineColor: this.lineColor,
          lineWidth: this.lineWidth,
          triggerMouseKey: this.triggerMouseKey,
          activeColor: this.activeColor,
        };
      }
    },

    watch: {
      options(val) {
        this.canvas.refresh(val);
      }
    },

    methods: {},

    ready() {
      const options = {
        ...this.options,
        el: this.$el,
        onSwipe: (list) => {
          this.$emit('onswipe', list);
        },
        onGesture: (res, points) => {
          this.$emit('ongesture', res, points);
        },
      };
      this.canvas = new smartGesture(options);
    },
  };
</script>

<style>
  .smart-gesture-wrapper {
    position: relative;
  }
</style>
