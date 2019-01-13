setTimeout(() => {
  console.log('setTimeout')
}, 0);

setImmediate(() => {
  console.log('setImmediate')
}, 0);

// setTimeout 和 setImmediate 默认情况顺序不固定，因为每个定时器都有等待时间，要看node的准备时间

console.log(1)
setTimeout(() => {
  console.log('setTimeout1')
  Promise.resolve('p').then((res) => console.log(res))
}, 0);
setTimeout(() => {
  console.log('setTimeout2')
}, 0);

// 1 setTimeout1  setTimeout2 p


// 第3题
setImmediate(() => {
  console.log('setImmediate1')
  setTimeout(() => {
    console.log('setTimeout1')
  }, 0);
})

setTimeout(() => {
  console.log('setTimeout2')
  setImmediate(() => {
    console.log('setImmediate2')
  });
}, 0)

// setImmediate1  setTimeout2  setTimeout1 setImmediate2
// nextTick是队列切换时执行的


let fs = require('fs')
fs.readFile('./test.js', () => {
  console.log('fs')
  setTimeout(() => {
    console.log('setTimeout')
  }, 0)
  setImmediate(() => {
    console.log('setImmediate')
  })
})

// fs 是pull阶段
// poll 的下一个阶段是check
// fs setImmediate setTimeout

// nextTick 不要写递归
function Person () {
  // 让特定的值在下一个队列中执行，好处就是优先级高于timeout
  process.nextTick(() => {
    this.arr()
  })
}
Person.prototype.eat = function eat(params) {
  this.arr = () => {
    console.log('eat')
  }
}

const p = new Person()
