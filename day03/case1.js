let Promise = require('./promise2')

// let p = new Promise((resolve, reject) => {
//   // throw new Error('出错')
//   setTimeout(() => {
//     reject('出错')
//   }, 3000)
// })

// p.then((value) => {
//   console.log(value)
// }, (reason) => {
//   console.log(reason)
// })

// then 执行后应该返回新的 promise
// 因为promise的状态失败就不能成功了
// Promise.reject().then(null, (reason) => {
//   return Promise.resolve(100)
// }).then((data) => {
//   console.log(data) // 上班失败还走成功
// })

// promise中的类型错误
let p = new Promise(function (resolve, reject) {
  resolve('ok')
})
let promise2 = p.then(() => {
  // 循环引用，因为自己循环引用
  return 100
})
