const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

// function Deduplication(arr) {
//   return [...new Set(arr)]
// }

function Deduplication1(arr) {
  return array.filter((item, idx) => arr.indexOf(item)===idx)
}

console.log(Deduplication1(array))