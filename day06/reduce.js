Array.prototype.reduce = function reduce(callback, prev) {
  for (let i = 0; i < this.length; i++) {
    if (prev !== undefined) {
      prev = callback(prev, this[i], i, this)
    } else {
      // 第一次没有prev，但是下一次有prev，需要把i的后移动
      prev = callback(this[i], this[i + 1], i + 1, this)
      i++
    }
  }
  return prev
}

const res = [1, 2, 3, 4].reduce((prev, cur) => {
  return prev + cur
}, 0)
console.log(res)
