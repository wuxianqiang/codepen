function Promise (executor) {
  let self = this;
  self.value = undefined;
  self.reason = undefined;
  self.onResolveCallbacks = [];
  self.onRejectCallbacks = [];
  // 保存当前promise的状态，有三个状态
  self.status = 'pending';
  function resolve (value) {
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'resolved';
      self.onResolveCallbacks.forEach(function (fn) {
        fn()
      })
    }
  }
  function reject (reason) {
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected'
      self.onRejectCallbacks.forEach(function (fn) {
        fn()
      })
    }
  }
  executor(resolve, reject)
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  // then 方法中需要传递两个回调，成功和失败回调
  let self = this
  if (self.status === 'resolved') {
    onFulfilled(self.value)
  }
  if (self.status === 'rejected') {
    onRejected(self.reason)
  }
  if (self.status === 'pending') {
    // executor 有异步的时候是pending状态
    self.onResolveCallbacks.push(function () {
      onFulfilled(self.value)
    })
    self.onRejectCallbacks.push(function () {
      onRejected(self.reason)
    })
  }
}

module.exports = Promise
