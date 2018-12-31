// 发布订阅，一般需要订阅的内容保存到队列里面，到发布的时候让数组里面的函数一次执行
const fs = require('fs')

const result = {}
let Dep = {
  arr: [],
  on (fn) {
    this.arr.push(fn)
  },
  emit () {
    if (Object.keys(result).length === 2) {
      this.arr.forEach(fn => fn())
    }
  }
}

Dep.on(function () {
  console.log(result)
})

fs.readFile('./data.json', 'utf8', (err, data) => {
  result.name = JSON.parse(data).name
  Dep.emit()
})
fs.readFile('./user.json', 'utf8', (err, data) => {
  result.age = JSON.parse(data).age
  Dep.emit()
})
