// map set 里面不能放重复的

let set = new Set() // 不能使用数组里面的方法
// set 里面的key 和 value 是一样的

for (const item of set.keys) {}
for (const item of set.values) {}
for (const item of set.entries) {}

Object.keys()
Object.values()
Object.entries()


// 求数组的并集,可能有重复的

let a = [1, 2, 3]
let b = [4, 5]


function union (a, b) {
  let newArr = [...new Set([...a, ...b])]
  return newArr
}
union(a, b)

// 交集
function insertion (a, b) {
  a = new Set(a);
  b = new Set(b);
  [...a].filter(item => {
    return b.has(item) // 有包含关系
  })
}


// 差集
function difference (a, b) {
  a = new Set(a);
  b = new Set(b);
  [...a].filter(item => {
    return !b.has(item) // 没有包含关系
  })
}

let map = new Map()
// map用set来添加
map.set({a: 1}, 'xxx')
map.set({a: 1}, 'xxx')
// 如果key是对象，会出现两个的情况，因为对象不相等
console.log(map)
map.forEach(item => {
  console.log(item)
})

new WeakMap() // 弱引用
// key 会自动回收，不会用引用关系
