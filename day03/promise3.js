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
    console.log(error)
    reject(error)
  }
}

// 解析链式调用
function resolvePromise (promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('循环引用'))
  }
  let called;
  if (typeof x !== null && (typeof x === 'function' || typeof x === 'object')) {
    // 是promise 才取then方法
    try {
      let then = x.then // then 必须是方法而不是属性之类的
      if (typeof then === 'function') {
        if (!called) { // 只能成功一次或者失败一次，而不是多次
          called = true
        } else {
          return
        }
        // 这个promise可能是别人写的，可能又成功又失败
        then.call(x, function (y) { // 必须让then方法执行把值传递到下一步
          // y 可能还是promise，再需要处理为普通值，递归解析promise直到常量
          // resolve(y)
          resolvePromise(promise2, y, resolve, reject)
        }, function (r) {
          if (!called) {
            called = true
          } else {
            return
          }
          reject(r)
        })
      } else {
        if (!called) {
          called = true
        } else {
          return
        }
        resolve(x)
      }
    } catch (error) {
      reject(error)
    }
  } else { // 普通值直接成功
    resolve(x)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  // onFulfilled onRejected 是可选参数
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
      setTimeout(() => { // 等待promise2初始化完成
        try {
          let x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          // console.log(error)
          reject(error)
        }
      }, 0);
      // 如果x 是普通值就让 promise变成成功
    }
    if (self.status === 'rejected') {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }, 0);
    }
    if (self.status === 'pending') {
      // executor 有异步的时候是pending状态
      self.onResolveCallbacks.push(function () {
        let x = onFulfilled(self.value)
        resolvePromise(promise2, x, resolve, reject)
      })
      self.onRejectCallbacks.push(function () {
        let x = onRejected(self.reason)
        resolvePromise(promise2, x, resolve, reject)
      })
    }
  })
  return promise2
}

// catch 其实是then的简写，把失败的回调传递过去
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
      if (currentIndex === promises.length) { // 当所有的promise都执行成为就成功了
        resolve(arr)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(function (data) { // 让数组里面的promise执行
        processData(i, data)
      }, function (err) {
        reject(err) // 里面的任何一个promise失败就失败了
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

// es9的语法，finally 无论如何都会执行的方法，then里面的成功和失败都都要写，还可以接着then
Promise.prototype.finally = function (callback) {
  return this.then(function (data) {
    // 先让函数执行再返回promise, callback 也可能是promise的
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

module.exports = Promise
