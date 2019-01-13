function* gen() {
  let a = yield 1;
  console.log(a)
}

function co (it) {
  return new Promise((resolve, reject) => {
    function next () {
      let {value, done} = it.next()
      if (!done) {
        value.then(data => {
          next(data)
        }, reject)
      } else {
        resolve(value)
      }
    }
    next()
  })
}
co(gen()).then((data) => {
  console.log(data, 'ok')
})
