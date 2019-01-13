// jq 里面的 extend

// 类的继承， ES5只有构造函数来模拟类

// constructor
// prototype
// __proto__

function Animal (name) {
  this.name = name; // 实例上的属性
  // this.data = {
  //   height: 30
  // }
}
Animal.prototype.data = {height: 30}


// 实例.__proto__ = 所属类的原型
// Animal.__proto__ = Function.prototype
// Animal.prototype = animal1.__proto__ 类的原型指向和实例的__proto__指向相同
// Animal.prototype.__proto__ = Object.prototype
// Function.prototype.__proto__ = Object.prototype
let animal1 = new Animal('猴子')
let animal2 = new Animal('猴子')
animal1.data === animal2.data
animal1.constructor === Animal
