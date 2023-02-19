function flat(arr, num=1) {
  let backtrack = (arr) => {
    let newArr = [];
    arr.forEach((element) => {
      if (Array.isArray(element)) {
        newArr.push(...element);
      } else {
        newArr.push(element);
      }
    });
    return newArr;
  }
  

  for(let i=0; i<num; i++) {
    arr = backtrack(arr);
  }

  return arr
}

const arr = [1, [2], [3, [4]]];

console.log(flat(arr))
// [1, 2, 3, [4]]

console.log(flat(arr, 1));
// [1, 2, 3, [4]]

console.log(flat(arr, 2))
// [1, 2, 3, 4]