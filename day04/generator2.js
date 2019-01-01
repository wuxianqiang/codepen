function* gen() {
  let a = yield 1;
  console.log(a)
}

let it = gen()
it.next() // 第一次调用next函数时传递的参数是无效的
it.next(1) // 第二次next 执行的参数会作为第一yield的返回值


let fs = require('fs')
let co = require('co')
function co (it) {
  return new Promise((resolve, reject) => {
    function next () {
      let {value, done} = it.next()
      if (!done) {
        value.then(data => {
          next(data)
        }, reject)
      } else {
        resolve(value)
      }
    }
    next()
  })
}
co(gen()).then((data) => {
  console.log(data, 'ok')
})


// async+ await 其实就是generator+co来实现的
