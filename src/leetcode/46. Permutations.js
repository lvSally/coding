/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  // iterate all data
  // nums.length === curChildren.length return
  // curChildren cache all sutiation
  let res = [];
  let numsUsedArr = [];
  backtrack(nums, res, [], numsUsedArr);
  return res;
};

function backtrack(nums, res, curChildren, numsUsedArr) {
  if (nums.length === curChildren.length) { // stop condition
    res.push(curChildren);
  }

  for (let i = 0; i < nums.length; i++) {
    if (numsUsedArr[i]) continue; // exclude used num
    // do each before return
    curChildren.push(nums[i]);
    numsUsedArr[i] = true;
    backtrack(nums, res, [...curChildren], numsUsedArr);
    // return do something
    curChildren.pop();
    numsUsedArr[i] = false;
  }
}
