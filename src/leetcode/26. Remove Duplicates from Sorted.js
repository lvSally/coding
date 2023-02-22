/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  // slow, fast
  // nums[slow] === num[fast], fast++
  // nums[slow] !== num[fast], nums[++slow]=num[fast] fast++
  if (nums.length === 1) return 1;
  let slow = 0,
    fast = 1;
  while (fast < nums.length) {
    if (nums[slow] === nums[fast]) {
      fast++;
    } else {
      nums[++slow] = nums[fast];
      fast++;
    }
  }
  return slow + 1;
};
