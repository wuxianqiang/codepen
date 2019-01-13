function _classCallCheck(sub, constr) {
  if (!(sub instanceof constr)) {
    throw new Error('cannot width new')
  }
}

function defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    Object.defineProperty(target, props[i].key, {
      value: props[i].value
    })
  }
}

function _createClass(Constructor, protoProperties, staticProperties) {
  if (protoProperties) {
    defineProperties(Constructor.prototype, protoProperties)
  }
  if (staticProperties) {
    defineProperties(Constructor, staticProperties)
  }
}

let Animal = function () {
  function Animal(type) {
    _classCallCheck(this, Animal) // 类的调用判断
    this.type = type
  }
  // 第一个参数，类，定义公有属性，类的属性
  _createClass(Animal, [
    { // 公有的方法不可枚举，使用defineProperties定义
      key: 'eat',
      value: function () {
        console.log('吃')
      }
    }
  ], [
      { // 静态的方法不可枚举，使用defineProperties定义
        key: 'flag',
        value: function () {
          return '静态方法'
        }
      }
    ])
  return Animal;
}()


function _inherits (subClass, parentClass) {
  // 子类继承父类的公有方法
  subClass.prototype = Object.create(parentClass.prototype, {Constructor: {value: subClass}})
  // 静态属性和方法也能调用subClass.__proto__ = parentClass
  Object.setPrototypeOf(subClass, parentClass)
}

let Child = function (Animal) {
  function Child(type) {
    _classCallCheck(this, Child)
    let that = this
    let val = Animal.call(this, type)
    if (typeof val === 'object') { // 对象作为实例
      that = val
    }
    return that
  }
  _inherits(Child, Animal)
  return Child
}(Animal)
