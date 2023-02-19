// let arr = [1, [2, [3, 4, 5]]]; => [1, 2, 3, 4，5]

function flatten(arr) {
  let str = '' + arr
  return str.replace(/\[|\]/g).split(',')
}

function flatten2(arr) {
  let res = []
  for(let i=0; i<arr.length; i++) {
    if(arr[i] instanceof Array) {
      res = res.concat(flatten2(arr[i]))
    } else {
      res.push(arr[i])
    }
  }

  return res
}

console.log(flatten2([1, [2, [3, 4, 5]]]))