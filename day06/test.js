function Person () {
  this.name = 'JS'
  this.age = 10
}
Person.prototype.todo = function () {
  return 'web'
}
Person.money = function () {
  return 100
}
function Child () {
  Person.call(this)
}
Object.setPrototypeOf(Child.prototype, Person.prototype)
console.log(Child.money())

// class Person {
//   static money () {
//     return 100
//   }
//   constructor () {
//     this.name = 'JS'
//     this.age = 10
//   }
//   todo () {
//     return 'web'
//   }
// }
// class Child extends Person {}
// console.log(Child.money())

// let boy = new Person()
// for (const item in boy) {
//   console.log(item)
// }
