// @babel/core 将es6转换为es5
// @babel/cli 是babel的命令行工具
// @babel/preset-env 怎么把es6转换为es5
// @babel/plugin-proposal-class-properties 转化类上面的属性，类里面的高级语法用的


class Person {
  name = 'js'
}

let p = new Person()
// 类属性的定义


// function sweetCoffee () {
//   coffee()
//   console.log('加糖')
// }
// // 装饰器
// sweetCoffee(coffee)
// function coffee () {
//   console.log('coffee')
// }

// @符号表示装饰器，可以装饰属性和方法
@flag
class Person {
  name = 'js';
}

function flag (target) {
  // 第一参数就是当前类
  target.flag = 'people'
}
let p = new Person()
