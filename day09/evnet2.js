// let EventEmitter = require()
function EventEmitter() {
  // 实例上的属性没有继承
  this._events = Object.create(null) // 这样创建对象没有原型链上的方法了
}

EventEmitter.prototype.on = function (eventName, callback, flag) {
  // 订阅事件
  if (!this._events) this._events = Object.create(null)
  if (eventName !== 'newListener') {
    // 每次添加事件都会执行newListener，除非添加它自己
    this._events['newListener'].forEach(fn => {
      fn(eventName)
    })
  }
  if (this._events[eventName]) {
    if (flag) {
      this._events[eventName].unshift(callback)
    } else {
      this._events[eventName].push(callback)
    }
  } else {
    this._events[eventName] = [callback]
  }
}

EventEmitter.prototype.emit = function (eventName, ...args) {
  // 发布事件
  this._events[eventName].forEach(fn => {
    fn.apply(this, args)
  })
}

EventEmitter.prototype.off = function (eventName, callback) {
  // 发布事件
  this._events[eventName] = this._events[eventName].filter(fn = fn !== callback)
}

EventEmitter.prototype.once = function (eventName, callback) {
  // 触发一次，先绑定一个零时函数，触发完成后，在函数中把自己删除
  function one (...args) {
    callback(...args)
    this.off(eventName, one)
  }
  this.on(eventName, one)
}

EventEmitter.prototype.prependListener = function (eventName, callback) {
  this.on(eventName, callback, true)
}

// Promise 在事件循环中的执行过程是怎样的
// 谈谈你对promise的理解
module.exports = EventEmitter
