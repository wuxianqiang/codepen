// ex6箭头函数，不要写return，没有this和argument


// function sum(a, b) {
//   return a + b
// }
// 使用箭头函数

const sum = (a, b) => a + b

// this是哪里定义的没有关系，

let b = 300
let obj = {
  b: 100,
  a: () => {
    setTimeout(() => {
      console.log(this.b)
    })
  }
}
obj.a()
