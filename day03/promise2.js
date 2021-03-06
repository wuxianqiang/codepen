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
  if (x === promise2) {
    return reject(new TypeError('循环引用'))
  }
  if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
    try {
      let then = x.then
      if (typeof then === 'function') { // 确定是promise，必须有then方法
        then.call(x, function (y) { // y 可能还是promise,必须递归解析为常量
          // resolve(y)
          resolvePromise(y, promise2, resolve, reject)
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
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (data) {
    return data
  }
  onRejected = typeof onRejected === 'function' ? onRejected : function (err) {
    throw err
  }
  // then 方法中需要传递两个回调，成功和失败回调
  let self = this
  // 调用then 后返回一个promise
  let promise2 = new Promise(function (resolve, reject) {
    if (self.status === 'resolved') {
      // 把then中成功或者失败的函数执行结果取到，判断执行结果是promise还是普通值
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(x, promise2, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }, 0);
      // 如果x 是普通值就让 promise变成成功
    }
    if (self.status === 'rejected') {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason)
          resolvePromise(x, promise2, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }, 0);
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
    }
  })
  return promise2
}

Promise.prototype.catch = function (errFn) {
  return this.then(null, errFn)
}

Promise.reject = function (reason) {
  return new Promise(function (resolve, reject) {
    reject(reason)
  })
}
Promise.resolve = function (data) {
  return new Promise(function (resolve, reject) {
    resolve(data)
  })
}

Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    let arr = []
    let currentIndex = 0 // promise.all 的原理就是计数器
    function processData (index, value) {
      arr[index] = value
      currentIndex++
      if (currentIndex === promises.length) {
        resolve(arr)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(function (data) {
        processData(i, data)
      }, function (err) {
        reject(err)
      })
    }
  })
}

Promise.race = function (promises) {
  return new Promise(function (resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}

Promise.prototype.finally = function (callback) {
  return this.then(function (data) {
    return Promise.resolve(callback()).then(function () {
      return data
    })
  }, function (reason) {
    callback()
    return Promise.resolve(callback()).then(function () {
      throw reason
    })
  })
}
// promise 必须异步执行我们的then方法
module.exports = Promise

// promise.all全部成功才成功，任意失败都会失败的
// promise.race 一个失败就失败了
