function sortArray(arr) {
  let len = arr.length
  for(let i=1; i<len-1; i++) {
    j=i
    while(j>0) {
      if(arr[j]<arr[j-1]) {
        [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
      }
      j--
    }
  }

  return arr
}

console.log(sortArray([3,2,5,5,6,1,10]))