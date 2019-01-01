let Promise = require('./promise3')

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
// let p = new Promise(function (resolve, reject) {
//   resolve('ok')
// })
// let promise2 = p.then((data) => {
//   // 循环引用，因为自己循环引用
//   return promise2
// })
// promise2.then(() => {

// }, (err) => {
//   console.log(err)
// })

// let p = new Promise(function (resolve, reject) {
//   resolve('ok')
// })
// let promise2 = p.then((data) => {
//   // 循环引用，因为自己循环引用
//   return new Promise(function (resolve, reject) {
//     // resolve(100) // 100就是y的值
//     reject(100) // 100就是r的值
//   })
// }).then((data) => {
//   console.log(data)
// }, (err) => {
//   console.log('err', err)
// })
// promise 必须异步执行then方法


// let p = new Promise(function (resolve, reject) {
//   resolve('ok')
// })
// let promise2 = p.then((data) => {
//   // 递归解析
//   return new Promise((resolve, reject) => {
//     resolve(new Promise((resolve, reject) => {
//       resolve(100)
//     }))
//   })
// }).then((data) => {
//   console.log('data', data)
// }, (err) => {
//   console.log('err', err)
// })

// let p = new Promise(function (resolve, reject) {
//     resolve('ok')
//   })
// let promise2 = p.then().then((data) => {
//   console.log('data', data)
// }, (err) => {
//   console.log('err', err)
// })


let p = new Promise(function (resolve, reject) {
    resolve('ok')
  })
let promise2 = p.then().then((data) => {
  console.log('data', data)
}, (err) => {
  console.log('err', err)
}).catch((err) => {
  console.log(err)
})


let p = new Promise(function (resolve, reject) {
  resolve('ok')
})
let promise2 = p.then().then((data) => {
console.log('data', data)
}, (err) => {
console.log('err', err)
}).catch((err) => {
console.log(err)
}).finally(() => {
  console.log('123')
})

let p = new Promise(function (resolve, reject) {
  resolve('ok')
})
let promise2 = p.then().then((data) => {
console.log('data', data)
}, (err) => {
console.log('err', err)
}).catch((err) => {
console.log(err)
}).then(() => {

}, () => {

})

// 
