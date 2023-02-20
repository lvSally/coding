/**
 * @param {number} n
 * @return {number}
 */

// TODO: use memo, Runtime 407 ms ?!
var fib1 = function (n) {
  const memo = Array(n + 1).fill(0);
  return backtrack(n, memo);
};
function backtrack1(n, memo) {
  if (n == 0 || n == 1) {
    return n;
  }
  if (memo[n] != 0) return memo[n];
  memo[n] = fib(n - 1) + fib(n - 2);
  return memo[n];
}

/**
 * @param {number} n
 * @return {number}
 */
// Runtime 87 ms..
var fib = function(n) {
    if(n==0) return 0
    if(n===1 || n===2) {
        return 1
    }
    return fib(n-1)+fib(n-2)
};
