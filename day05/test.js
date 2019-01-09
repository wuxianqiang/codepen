let obb = {
  a: 1,
  b () {
    console.log('b')
  },
  c: /\d+/
}
// JSON 格式的有些是无法解析的
let res = JSON.parse(JSON.stringify(obb))

// 深拷贝，递归实现
function deepClone (obj, hash = new WeakMap) {
  if (obj === null) return null
  if (typeof obj !== 'object') return obj // 函数拷贝是无需要管
  if (obj instanceof RegExp) return new RegExp(obj) // 正则
  if (obj instanceof Date) return new Date(obj) // 时间
  if (hash.has(obj)) return hash.get(obj)
  let newObj = new obj.constructor // 数组和对象都能实现
  hash.set(obj, newObj)
  for (let key in obj) {
    newObj[key] = deepClone(obj[key], hash)
  }
  return newObj
}

let obj = {a: 1}
obj['b'] = obj

Object.assign()
// 展开运算符运用于数组较多，只能放在最后面
let arr1 = [1,2]
let arr2 = [3,4]
let res = [].concat(arr1, arr2)

// Math.max(...arr1)
let temp = 1234
let obj = {}
Object.defineProperty(obj, 'name', {
  // value: 123, value可以通过getter和setter定义
  enumerable: true,
  writable: true, // 常量不能重新赋值为false
  configurable: true,
  get () {
    return temp
  },
  set (value) {
    temp = value
  }
})
console.log(obj.value) // 对象定义属性
