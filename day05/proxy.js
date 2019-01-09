// es6代理

let obj = {name: 'hello', arr: [1,2,2]}
// Object.defineProperty 不支持数组的

// 可以监测的数组变化
let p = new Proxy(obj, {
  get (target, key, proxy) {
    // proxy 参数是代理对象，相当于p
    // return target[key]
    // 长度更新了不需要调用update方法
    if (key === 'length') return true
    return Reflect.get(target, key) // 反射
  },
  set (target, key, value) {
    if (key === 'length') return true
    return Reflect.set(target, key, value)
  }
})

// p 是拦截对象，可以增加属性也能监听
// proxy.push(2) 数组也会更新
