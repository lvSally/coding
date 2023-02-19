function debounce(fn, delay, option={leading: true, trailling: true}) {
  let timer = null
  return (args) => {
    let isInvoked = false
    if (timer === null && option.leading) {
      fn(...args);
      isInvoked = true
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      if(option.trailling && !isInvoked) {
        fn(...args);
      }

      timer = null
    }, delay);
  }
}

// let currentTime = 0;

// const run = (input) => {
//   currentTime = 0;
//   const calls = [];

//   const func = (arg) => {
//     calls.push(`${arg}@${currentTime}`);
//     console.log(calls)
//   };

//   const debounced = debounce(func, 3, {leading: false, trailling: true});
//   input.forEach((call) => {
//     const [arg, time] = call.split("@");
//     currentTime = time
//     setTimeout(() => debounced(arg), time);
//   });
//   return calls;
// };

// run(["A@0", "B@2", "C@3"]);