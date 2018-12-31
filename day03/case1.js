let Promise = require('./promise')

let p = new Promise((resolve, reject) => {
  resolve('hello')
})

p.then((value) => {
  console.log(value)
}, (reason) => {
  console.log(reason)
})
