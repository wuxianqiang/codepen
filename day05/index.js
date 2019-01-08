// const不允许改变引用地址
Promise.all([1,2,3]).then(data => {
})

// ES6 let const
// 结构赋值
let [, y = 0] = '1-1'.split('-')
console.log(y)

// =是默认值，:是起别名

let [{a}] = [{a: 1}]
console.log(a)

// 展开运算符
let obj = {name: 'hello'}

let obj2 = {...obj} // 浅拷贝


let obb = {
  a: 1,
  b: function () {
    console.log('b')
  },
  c: /\d+/
}
JSON.parse(JSON.stringify(obb)) // {a: 1, c: {}}
