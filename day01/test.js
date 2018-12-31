// console.log(process.argv) // 执行时的参数

// cross-env 可以兼容电脑的设置环境变量
// console.log(process.env.NODE_ENV) // 环境变量
// set NODE_ENV=development mac设置
// export NODE_ENV=development window设置

// console.log(process.cwd(), '当前的工作目录')

// function getPath(pathname) {
//   return path.resolve(process.cwd(), pathname)
// }

// process.stdin.on('data', (data) => {
//   // console.log(data.toString())
// })

// process.nextTick 微任务，比promise中的then快


let a = 1;
a += 1;
a--
console.log(a)
