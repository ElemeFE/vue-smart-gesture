# vue-smart-gesture

这是 [smart-gesture](https://github.com/ElemeFE/smart-gesture) 的 vue 版本, 在线 [demo](https://elemefe.github.io/smart-gesture/)


## Usage

```
<template>
  <div v-smart-gesture="options"></div>
</template>

<script>
  import smartGesture from 'vue-smart-gesture';

  export default {
    data() {
      return {
        //initial options
        options: {
          enablePath: true,
          timeDelay: 100,
          lineColor: '#666',
          lineWidth: 4,
          triggerMouseKey: 'right',
          activeColor: 'rgba(0, 0, 0, .05)',
        },
      };
    },
    directives: {
      smartGesture
    },
    events: {
      'smart-gesture-onswipe': function(list) {},
      'smart-gesture-ongesture': function(res, points) {},
    }
  };
</script>
```

## Documentation

### configuration

可配置的参数如下:

- `enablePath` 是否显示鼠标轨迹,类型为`Boolean`。(default: `true`)

- `lineColor` 鼠标轨迹的颜色,类型为`String`。(default: `#666`)

- `lineWidth` 鼠标轨迹的宽度,类型为`Number`,单位`px`。(default: `4`)

- `timeDelay` 长按一定时间后才会触发手势识别,类型为`Number`,单位`ms`。(default: `600`)

- `triggerMouseKey` 触发手势识别的鼠标按键,类型为`String`,可选值`left | right`。(default: `right`)

- `gestures` 初始化自定义图形集合。类型为`Array | Object`,若不想使用预设的手势,可以传空数组。(default: [所有预设的手势])

- `activeColor` 开启手势时背景色。类型为`String`。(default: `rgba(0, 0, 0, .05)`)

- `eventType` 响应事件的类型。类型为`String`,可选值`touch | mouse`,当指定为`touch`时将捕获`touch`相关的事件,简单的说如果用于移动端请将参数设置为`touch`。(default: `mouse`)

### events

会在vm上触发如下事件：

- `smart-gesture-onswipe` `function(directionList)` 手势结束时调用,

    - `directionList`: 普通手势的识别结果,数组。


- `smart-gesture-ongesture` `function(result, points)` 手势结束时调用

    - `result`: 自定义图形手势的识别结果,值为一个对象,包含`name`和`score`两个key。

    - `points`: 包含该次手势的轨迹的点的集合构成的数组。可以配合`addGesture`方法来实现自定义手势功能。


### Methods

可通过vm.$smartGesture对象调用实例方法

- `.addGesture(gesture)` 添加自定义图形模板
    - gesture: 自定义图形模板
        - type: Object
        - gesture.name:String: 模板名称
        - gesture.points:Array: 点集合

- `.refresh(options)` 重新刷新实例的options

    - options: smartGesture参数对象

- `.destroy()` 销毁当前的实例

## Development

```
npm i
npm run dev
```

## Contribution

请在提交 PR 前阅读我们的[贡献指南](./.github/CONTRIBUTING_zh-cn.md)

## License

MIT
