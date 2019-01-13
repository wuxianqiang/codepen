function Animal () {
  this.type = '动物'
}
Animal.prototype.drink = function () {
  console.log('吃')
}


function Cat (name) { // 类中的this指向实例
  this.name = name
  Animal.call(this)
}
let c = new Cat('猫')

// Cat.prototype = Animal.prototype 不要共用原型
// 继承公共属性

// ES5
// Cat.prototype.__proto__ = Animal.prototype
// ES6
// Object.setPrototypeOf(Cat.prototype, Animal.prototype)
// c.drink()

// Object.create() 继承
// Object.create(null)
Cat.prototype = Object.create(Animal.prototype, {constructor: {value: Cat}})
// c.constructor
function create (patentProto) {
  function Fn () {}
  Fn.prototype = patentProto
  return new Fn()
}

// Cat.prototype = new Animal() 不能给父类传递参数
// 在类里面调用call就是为了传递参数，继承实例
// 公有的属性使用上面两种


// es6静态方法es7静态属性，类上声明的属性和方法
// Animal.a = 1;
// Animal.fn = function () {
// }
// Object.setPrototypeOf(Cat, Animal)
// Cat.a
