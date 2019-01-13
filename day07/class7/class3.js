class Animal {
  constructor (age) {
    this.type = '动物';
    this.age = age;
  }
  drink () {
    console.log('吃');
  }
}

// 会继承实例和原型属性，包括静态方法也会继承
@log
class Cat extends Animal {
  @readonly PI = 3014;
  static b = 1; // 静态属性，定义在类上
  a = 1; // 实例的属性，babel需要安装类的插件 @babel/plugin-proposal-class-properties
  @before
  say () {
    console.log('say')
  }
}
let c = new Cat(12)
function log (target) { // 修饰类
  target.value = 100
}

function readonly (target, key, value) { // 修饰属性
  // target 类的原型， key 是修饰的属性名，value 是属性描述器
  value.writable = false
}

function before (target, key, description) {
  let oldSay = description.value
  description.value = function (params) {
    console.log('old')
    oldSay()
  }
}

console.log(c.age)
console.log(c.a)
console.log(Cat.b)

// 装饰器，类的属性，草案里面的方法，需要安装babel插件
