let fs = require('fs')

// 异步回调嵌套的问题，会导致代码难以维护，而且不方便处理错误
// let result = {}
// fs.readFile('./data.json', 'utf8', (err, data) => {
//   result.name = JSON.parse(data).name
//   fs.readFile('./user.json', 'utf8', (err, data) => {
//     result.age = JSON.parse(data).age
//     console.log(result)
//   })
// })


// 多个异步同时执行，在某一时刻拿到最终结果

let result = {}
// function checkValue () {
//   if (Object.keys(result).length === 2) {
//     console.log(result)
//   }
// }

function after (times, callback) {
  return function (params) {
    if (--times === 0) {
      callback()
    }
  }
}

let checkValue = after(2, function (params) {
  console.log(result)
})

fs.readFile('./data.json', 'utf8', (err, data) => {
  result.name = JSON.parse(data).name
  checkValue()
})
fs.readFile('./user.json', 'utf8', (err, data) => {
  result.age = JSON.parse(data).age
  checkValue()
})
