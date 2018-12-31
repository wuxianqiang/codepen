console.log('方法执行')
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
  try {
    executor(resolve, reject)
  } catch (error) { // 如何执行器发生异常那就走到失败的回调函数中
    reject(error)
  }
}

// 解析链式调用
function resolvePromise (x, promise2, resolve, reject) {
  console.log(x, promise2)
  if (x === promise2) {
    return reject(new TypeError('循环引用'))
  }
  if (x !== null && typeof x === 'function' || typeof x === 'object') {
    try {
      let then = x.then
      if (typeof then === 'function') { // 确定是promise
        then.call(x, function (y) {
          resolve(y)
        }, function (r) {
          reject(r)
        })
      } else {
        // {then: 123}
        resolve(x)
      }
    } catch (error) {
      reject(error) // 对象上没有then方法
    }
  } else {
    // x是普通值，直接成功了
    resolve(x)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  // then 方法中需要传递两个回调，成功和失败回调
  let self = this
  // 调用then 后返回一个promise
  let promise2 = new Promise(function (resolve, reject) {
    if (self.status === 'resolved') {
      // 把then中成功或者失败的函数执行结果取到，判断执行结果是promise还是普通值
      let x = onFulfilled(self.value)
      resolvePromise(x, promise2, resolve, reject)
      // 如果x 是普通值就让 promise变成成功
    }
    if (self.status === 'rejected') {
      let x = onRejected(self.reason)
      resolvePromise(x, promise2, resolve, reject)
    }
    if (self.status === 'pending') {
      // executor 有异步的时候是pending状态
      self.onResolveCallbacks.push(function () {
        let x = onFulfilled(self.value)
        resolvePromise(x, promise2, resolve, reject)
      })
      self.onRejectCallbacks.push(function () {
        let x = onRejected(self.reason)
        resolvePromise(x, promise2, resolve, reject)
      })
      return promise2
    }
  })
}

module.exports = Promise
