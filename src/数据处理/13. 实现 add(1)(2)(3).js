function add(a) {
  return (b) => {
    return (c) => {
      return a + b + c
    }
  }
}

let fn = add(1)
fn = fn(2)
console.log(fn(3))