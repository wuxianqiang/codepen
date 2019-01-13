// 如何自己实现一个模板字符串

let name = 'dog'
let age = '12'
let str = '${name}-${age}'

let reg = /\$\{([^}]*)\}/g
let res = str.replace(reg, (...args) => {
  args[1]
})
console.log(res)
