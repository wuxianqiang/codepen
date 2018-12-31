// promise 解决的问题：回调地狱， 多个请求合并同一个请求

// let p = new Promise((resolve, reject) => {
//   resolve('有钱') // 以第一次调用为准
//   reject('没钱')
// })

// p.then((value) => {
//   console.log(value)
// }, (reason) => {
//   console.log(reason)
// })

// 1. Promise 是个类，函数
// 2. new Promise 时传递一个 executor 执行器 （同步执行）
// 3. executor 中有两个参数，resolve成功，reject失败
// 4. 每个 Promise 实例都有 then 方法
// 5. Promise 中有三个状态，padding状态可以到 resolved 或者 rejected 状态


let fs = require('fs')
function read (url, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, encoding, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

// then 执行会判断返回结果，把参数传递给下一次then

read('./user.json', 'utf8').then((value) => {
  return read('./data.json', 'utf8') // 可以返回普通值也可以返回promise，会作为下一次then的成功结果，如果想让下一次then执行失败的回调，可以抛异常和执行reject()
}).then((value) => {
  console.log(value)
})


// 多个异步并发执行,数组里面可以放多个promise

Promise.all([read('./user.json', 'utf8'), read('./data.json', 'utf8')]).then((data) => {
  console.log(data)
})
