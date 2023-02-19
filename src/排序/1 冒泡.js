function sortArray(arr) {
  let len = arr.length
  for(let i=0; i<len-1; i++) {
    for(let j=i+1; j<len; j++) {
      if(arr[i]>arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }

  return arr
}

console.log(sortArray([3,2,5,5,6,1,10]))