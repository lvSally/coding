// TODO: has some issue

function sortArray(arr) {
  sortFn(arr, 0, arr.length-1)
  return arr
}

function sortFn(arr, start, end) {
  if(start>=end) {
    return
  }
  let mid = detailFn(arr, start, end)
  sortFn(arr, start, mid-1)
  sortFn(arr, mid+1, end)
}

function detailFn(arr, start, end) {
  let pivot = arr[start], left = start+1, right = end

  while(left<right) {
    while(left < right && arr[left] <= pivot) {
      left ++
    }
    while(left < right && arr[right] >= pivot) {
      right --
    }

    if(left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]]
      left++
      right--
    }

    if(left === right && arr[right]>pivot) {
      right--
    }

    if(start !== right) {
      [arr[start], arr[right]] = [arr[right], arr[start]]
    }
  }

  return right
}



console.log(sortArray([3,2,5,5,6,1,10]))