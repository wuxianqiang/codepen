// 事件循环
// js 的主线程是单线程，ajax， setTimeout，webworker（单开一条线程，完成之后通知主线程，在主线程执行）
// JS线程 UI线程 渲染时候
// 多线程，锁
// 计算机调度任务的最小单位，进程，进程包含线程
// CPU 分为多少核

// 栈（代码执行就是栈，先进后出），队列（先进先出）

// setTimeout(() => {
//   console.log(1)
// }, 1);
// setTimeout(() => {
//   console.log(1)
// }, 1);

// 按顺序放，
// 等同步代码执行完再执行异步代码

// 执行事件循环

// 主栈
// callback queue 队列 宏任务
// 微任务

// 宏任务
setTimeout(() => {
  console.log('timer')
}, 0);
// 微任务
Promise.resolve().then(data => {
  console.log('123')
})


Promise.resolve().then(data => {
  console.log('p1')
  setTimeout(() => {
    console.log('timer1')
  }, 0);
})

setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(data => {
    console.log('p2')
  })
}, 0);

// 浏览器里面的事件循环，先执行主栈的代码，清空微任务队列，取一个宏任务执行，再去清空微任务队列，取一个宏任务执行，这样循环下去

// Promise MutationObserve MessageChannel， node (nextTick)

// setImmediate() IE才有,宏任务，setTimeout
