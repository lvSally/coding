/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  return backtrack(0, nums.length - 1, nums, target);
};

function backtrack(left, right, arr, target) {
  let mid = Math.floor((right - left) / 2) + left;
  if (left > right) {
    return -1;
  }
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return backtrack(mid + 1, right, arr, target);
  } else if (arr[mid] > target) {
    return backtrack(left, mid - 1, arr, target);
  }
}

console.log(search([-1, 0, 9, 12], 9), 111);
