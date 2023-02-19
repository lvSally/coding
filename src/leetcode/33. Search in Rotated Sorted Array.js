/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  var findMin = (nums) => {
    let min = 0;
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < nums[min]) {
        min = i;
      }
    }
    return min;
  };
  var backtrack = (left, right, nums, target) => {
    let mid = left + ((right - left) >> 1);
    console.log(left, right);
    if (left === right) {
      console.log(left, 111)
      if (nums[left] === target) {
        return left;
      } else {
        return -1;
      }
    }
    if (left > right) {
      return -1;
    }
    if (target === nums[mid]) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
      return backtrack(left, right, nums, target);
    } else if (nums[mid] < target) {
      left = mid + 1;
      return backtrack(left, right, nums, target);
    }
  };
  let min = findMin(nums);
  console.log(min, 'min')
  let left = -1,
    right = -1;
  if (min === 0) {
    left = backtrack(0, nums.length - 1, nums, target);
  } else {
    left = backtrack(0, min - 1, nums, target);
    right = backtrack(min, nums.length - 1, nums, target);
  }

  return left !== -1 ? left : right;
};

search([3,1], 1)
