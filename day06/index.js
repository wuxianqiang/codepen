class Animal {
  // type = 'dog' // 相当于this.type = 'dog'
  // static PI = 3.14 这样写静态方法需要babel编译，es6是不支持，需要babel编译
  static flag () {
    return '静态方法'
  }
  constructor (type) {
    this.type = type
    // return {a: 1} // 如果返回了一个普通对象，将会通过对象作为子类
  }
  eat () {
    // this就是实例
    console.log('THIS')
  }
}
// Animal() 不能这样执行，es6的类只能new

// let animal = new Animal('dog')



// Animal.flag()

// // 静态方法子类是可以继承的
class Cat extends Animal { // 里面内置了call，也继承了公有的属性
  constructor (type) { // 可以省略，但是写了constructor就必须写super和传入参数, Animal.call(this, type)
    super(type)
  }
}

console.log(Cat.flag()) // 静态方法也可以继承
