// generator 生成器
// 可以配合promise来使用

// 生成器是用来生成迭代器的
// 什么是迭代器

let likeArray = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
  [Symbol.iterator] () {
    let flag = false;
    let index = 0;
    let that = this;
    return {
      next () {
        return {
          done: index === that.length,
          value: that[index++]
        }
      }
    }
  }
}

let arr = [...likeArray]
console.log(arr)

// 生成器生成迭代器
