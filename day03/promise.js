function Promise (executor) {
  let self = this;
  self.value = undefined;
  self.reason = undefined;
  // 保存当前promise的状态，有三个状态
  self.status = 'pending';
  function resolve (value) {
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'resolved';
    }
  }
  function reject (reason) {
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected'
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
}

module.exports = Promise
