/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let start = 0,
    end = nums.length - 1;
  if (end > start) {
    while (nums[end] === 0) {
      end--;
    }
    if (nums[start] === 0) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  }
  return nums;
};
console.log(moveZeroes([0, 1, 0, 3, 12]));