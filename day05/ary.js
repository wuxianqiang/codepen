// map reduce

// 写一个求和函数

function sum(...args) {
  // 上一次的返回值是prev
  return args.reduce((prev, cur) => {
    return prev + cur
  })
}

let res = sum(1, 2, 3, 4, 5)
console.log(res)
let sell = [
  {price: 10, count: 1},
  {price: 10, count: 1},
  {price: 10, count: 1}
]

// 求和函数

function total(arr) {
  // 上一次的返回值是prev
  return arr.reduce((prev, cur) => {
    return prev + cur.price * cur.count
  },  0) // 可以手动指定reduce的第一项
}

// 把函数组合起来

function sum (a, b) {
  return a + b
}
function toUpper (str) {
  return str.toUpperCase()
}
toUpper(sum('x', 'y'))

let compose = (...fns) => {
  return (...args) => {
    let lastFn = fns.pop() // 取出最后一个作为参数第一项
    fns.reduceRight((prev, cur) => {
      return next(prev)
    }, lastFn(...args))
  }
}

// x, y 的参数先存入sum，sum 执行结果然后再执行toUpper
compose(toUpper, sum)('x', 'y') // 高阶函数

// 取消默认值
// redux 还是把compose方法用reduce执行了

let compose = (...fns) => {
  return fns.reduce((a, b) => {
    return (...args) => { // 返回的函数会作为下一次的prev
      return a(b(...args))
    }
  })
}


let arr = ['name', 'age']
let arr1 = ['wu', '12']

// 逗号默认取最后一个结果
let res = arr.reduce((memo, prev, index) => {
  memo[prev] = arr1[index]
  return memo
}, {})

// 可以使用逗号2运算符
console.log(res)
// includes 有些不会编译
