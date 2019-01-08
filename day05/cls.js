// 以前认为类要大写
// 类也可以当做函数来调用，但是es6只能new
function Animal (type) {
  // this是实例
  this.type = type
  this.eat = function (params) {
    console.log(params)
  }
}
Animal.fn = function fn(params) {
  console.log('静态方法')
}
let a1 = new Animal()
let a2 = new Animal()
a1.eat === a2.eat // false

// Animal.prototype.constructor === Animal
Animal.fn()


function child (type) {
  Animal.call(this, type) // 继承实例上的属性
}
// 继承私有属性


// 获取公共属性
function child (type) {
  
}

// 不要公用原型child.prototype = Animal.prototype
child.prototype.__proto__ = Animal.prototype
// es6方法有这样
Object.setPrototypeOf(child.prototype, Animal.prototype)

child.prototype = Object.create(Animal.prototype)

function create (parentPrototype) {
  let Fn = function () {}
  Fn.prototype = parentPrototype
  let fn = new Fn
  fn.constructor = child; // 注意原型上的construction属性
  return new Fn
}

child.prototype = new Animal() //继承私有的和公有的，但是无法传参给父类
// 初始化化子类无法给父类传参
