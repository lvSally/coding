/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let start = 0,
    end = numbers.length - 1;
  while (start < end) {
    let cur = numbers[start] + numbers[end];
    if (cur === target) {
      return [start+1, end+1];
    }
    if (cur < target) {
      start++;
    } else {
      end--;
    }
  }

  return -1;
};

console.log(twoSum([2, 7, 11, 15], 9));