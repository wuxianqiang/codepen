// require('./a')
// mode 会先找文件，再找文件夹里面的index.js文件
// node查找机制

let util = require('util')
let fs = require('fs')

// 将回调的方式转换为promise形式
let read = util.promisify(fs.readFile)

read('./test.js', 'utf8').then(data => {
  console.log(data)
}, (err) => {
  console.log(err)
})

util.inherits() // 继承原型上的属性

// mz 这个模块自动把node的模块转换为 promise形式

// let mz = require('mz/fs')
// fs.readFile('./test.js', 'utf8').then(data => {
  // console.log(err)
// })
