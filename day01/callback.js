// 高阶函数 函数返回函数

// 一个函数可以接受一个函数，根据条件选择执行一个函数

// function after (times, callback) {
//   return function (params) {
//     if (--times === 0) {
//       callback()
//     }
//   }
// }

// let fn = after(3, function (params) {
//   console.log('fn 被调用了3次')
// })

// fn();
// fn();
// fn();

// 读一个文件，3s后才能获取结果

// function read(callback) {
//   setTimeout(() => {
//     let result = '读取成功'
//     callback(result)
//   }, 3000);
// }

// read((result) => {
//   console.log(result)
// })

let fs = require('fs')
fs.readFile('./test.js', 'utf8', (error, data) => {
  console.log(data)
})
