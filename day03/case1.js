let Promise = require('./promise')

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('出错')
  }, 3000)
})

p.then((value) => {
  console.log(value)
}, (reason) => {
  console.log(reason)
})
