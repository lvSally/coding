function curry_simple(fn) {
  return function innerFn(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...nextArgs) => innerFn(...args, ...nextArgs);
    }
  };
}

// advence
function curry(func) {
  return function curried(...args) {
    let useableArgs = args.filter(item => item !== curry.placeholder)
    if (useableArgs.length >= func.length) return func(...useableArgs);
    return function (...newArgs) {
      // replace placeholders in args with values from newArgs
      const res = args.map((arg) =>
        arg === curry.placeholder && newArgs.length ? newArgs.shift() : arg
      );
      return curried(...res, ...newArgs);
    };
  };
}

curry.placeholder = Symbol();

// test

const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}

const _ = curry.placeholder;

const curriedJoin = curry(join)
console.log(curriedJoin(1, 2, 3));
console.log(curriedJoin(1)(2, 3));
console.log(curriedJoin(1, 2)(3));

console.log(curriedJoin(_, 2)(1, 3)) // '1_2_3'

console.log(curriedJoin(_, _, _)(1)(_, 3)(2)) // '1_2_3'
