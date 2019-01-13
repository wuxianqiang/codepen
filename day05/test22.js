function sum (a, b) {
  return a + b
}

function toUpper (str) {
  return str.toUpperCase()
}

// compose = (...fns) => {
//   return fns.reduce((a, b) => {

//   })
// }

let compose = (...fns) => {
  return fns.reduce((a, b) => {
    return (...args) => { // 返回的函数会作为下一次的prev
      return a(b(...args))
    }
  })
}

let res = compose(toUpper, sum)('x', 'y')
console.log(res)


let compose = (...fns) => {
  return fns.reduce((a, b) => {
    // toUpper sum
    return (...args) => {
      // 'x', 'y'
      b(a(...args))
    }
  })
}
