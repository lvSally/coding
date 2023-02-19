function sortArray(arr) {
  let len = arr.length
  for(let i=0; i<len-1; i++) {
    let min=i
    for(let j=i+1; j<len; j++) {
      if(arr[i]>arr[j]) {
        min = j
      }
    }
    [arr[i], arr[min]] = [arr[min], arr[i]]
  }

  return arr
}

console.log(sortArray([3,2,5,5,6,1,10]))