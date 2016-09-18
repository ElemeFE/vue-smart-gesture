<template>
  <div class="configure">
    <h2>配置 configuration</h2>
    <p><input type="checkbox"
      id="path"
      v-model="options.enablePath"><label for="path">开启鼠标轨迹</label><span class="option-tip">enablePath</span></p>
    <p><span class="config-title">触发手势识别时间(ms)</span><input id="delay"
      type="number" number lazy
      v-model="options.timeDelay"><span class="option-tip">timeDelay</span></p>
    <p><span class="config-title">鼠标轨迹颜色</span><input id="color"
      type="text" lazy
      v-model="options.lineColor"><span class="option-tip">lineColor</span></p>
    <p><span class="config-title">鼠标轨迹宽度</span>
      <input id="width" type="number" number lazy v-model="options.lineWidth"><span
      class="option-tip">lineWidth</span></p>
    <p><span class="config-title">触发手势识别鼠标按键</span><input id="key"
      type="text" lazy
      v-model="options.triggerMouseKey"><span class="option-tip">triggerMouseKey</span></p>
    <p><span class="config-title">开启手势时背景色</span><input id="active-color"
      type="text" lazy
      v-model="options.activeColor"><span class="option-tip">triggerMouseKey</span></p>
  </div>
  <div class="recognize">
    <div class="add">
      <h2>手势区域</h2>
      <label>添加新手势 </label>
      <input id="gestureName" placeholder="手势名称" v-model="newGestureName">
      <button id="btn" @click="addNewGesture">ADD</button>
    </div>
    <div class="result">
      <h2>识别结果</h2>
      <p>Gesture result: <span style="font-weight: bold; color: #2b5;" id="result">{{gestureResult}}</span></p>
      <p>Swipe directions result: <span style="font-weight: bold; color: #2b5;" id="result0">{{swipeResult}}</span></p>
    </div>
    <div class="stage" v-smart-gesture="options"></div>
    <!-- <smart-gesture id="test" class="stage"
      :enable-path="options.enablePath"
      :time-delay="options.timeDelay"
      :line-color="options.lineColor"
      :line-width="options.lineWidth"
      :trigger-mouseKey="options.triggerMouseKey"
      :active-color="options.activeColor">
    </smart-gesture> -->
  </div>

</template>

<script>
import smartGesture from './smart-gesture';

export default {
  data() {
    return {
      options: {
        enablePath: true,
        timeDelay: 100,
        lineColor: '#666',
        lineWidth: 4,
        triggerMouseKey: 'right',
        activeColor: 'rgba(0, 0, 0, .05)',
      },
      swipeResult: '',
      gestureResult: '',
      lastPoints: [],
      newGestureName: '',
    };
  },
  directives: {
    smartGesture
  },
  methods: {
    addNewGesture() {
      if (!this.newGestureName) {
        alert('给我起个名字啊！');
        return;
      }

      this.$smartGesture.addGesture({
        name: this.newGestureName,
        points: this.lastPoints,
      });
    },
    'smart-gesture-onswipe': function(list) {
      this.swipeResult = list;
    },
    'smart-gesture-ongesture': function(res, points) {
      this.gestureResult = res.score > 2 ? res.name : '未识别';
      this.lastPoints = points;
    },
  },
  events: {
    'smart-gesture-onswipe': function(list) {
      this.swipeResult = list;
    },
    'smart-gesture-ongesture': function(res, points) {
      this.gestureResult = res.score > 2 ? res.name : '未识别';
      this.lastPoints = points;
    },
  }
};
</script>

<style>
  .configure,
  .recognize {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 15px;
    margin-top: 10px;
  }

  .add,
  .result {
    display: inline-block;
    vertical-align: top;
  }

  .result {
    margin-left: 100px;
    padding-left: 100px;
    border-left: 1px dashed #ccc;
  }

  .config-title {
    display: inline-block;
    width: 200px;
  }

  .option-tip {
    margin-left: 10px;
    font-size: 12px;
    vertical-align: middle;
  }

  .stage {
    height: 400px;
    background: #ddd;
    position: relative;
    margin: 15px 0;
  }

  .stage:before {
    content: '绘制区域';
    color: #eeeeee;
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
