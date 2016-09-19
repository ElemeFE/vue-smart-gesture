var smartGesture = require('smart-gesture');

module.exports = {
  deep: true,
  update: function(options) {
    var self = this;
    var finalOptions = {};
    Object.keys(options).forEach(function(key) {
      finalOptions[key] = options[key];
    });

    if (!self.canvas) {
      finalOptions.el = self.el;
      finalOptions.onSwipe = function(list) {
        self.vm.$emit('smart-gesture-onswipe', list);
      };
      finalOptions.onGesture = function(res, points) {
        self.vm.$emit('smart-gesture-ongesture', res, points);
      };
      self.canvas = self.vm.$smartGesture = new smartGesture(finalOptions);
    } else {
      self.canvas.refresh(options);
    }
  }
};
