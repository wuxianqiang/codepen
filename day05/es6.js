// 双向数据绑定

let obj = { name: 'hello', age: { massage: 'hello' } }

function update () {
  console.log('数据更新了')
}
function observer (obj) {
  if (typeof obj !== 'object') {
    return obj // 普通值不需要观察
  }
  for (const key in obj) {
    defineReactive(obj, key, obj[key])
  }
  // defineReactive()
}
observer(obj)
// obj.name = 100
// 将对象的属性都定义为defineProperty
function defineReactive (obj, key, value) {
  observer(value)
  Object.defineProperty(obj, key, {
    get () {
      return value
    },
    set (newValue) {
      update()
      if (value !== newValue) {
        value = newValue
      }
    }
  })
}
// Object.defineProperty(obj, 'name', {
//   // 描述器2
//   get () {

//   },
//   set () {

//   }
// })
obj.name = 'sss'
// console.log(obj.name)
