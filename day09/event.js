// 事件驱动，原理就是发布订阅

// let EventEmitter = require('events')
let EventEmitter = require('./evnet2')
let util = require('util')
function Girl () {}
util.inherits(Girl, EventEmitter) // 继承

let girl = new Girl()
// girl.on('newListener', (type) => {
//   console.log(type) // 只要一绑定事件就会触发这个方法
  
// })
girl.on('handleFn', () => {
  console.log('handleFn')
})
girl.off('handleFn', () => {
  console.log('handleFn')
})
girl.once('handleFn', () => {
  console.log('handleFn')
})
girl.emit('handleFn', 'a', 'b')


// newListener 监听用户是否绑定了新的事件
