function sum(num) {
  // your code here
  const func = (nextNum) => {
    if (!nextNum) return num;
    return sum(num + nextNum);
  };

  func.valueOf = () => num;
  return func;
}

const sum1 = sum(1);
console.log(sum(1)(2)(3) == 6);
