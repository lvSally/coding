function throttle(
  cb,
  delay = 1000,
  option = { leading: true, trailling: true }
) {
  let shouldWait = false,
    waitingArgs = null;

  let { leading, trailling } = option;

  const timeoutFunc = () => {
    if (waitingArgs && trailling) {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    } else {
      shouldWait = false;
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    if (leading) cb(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}

// ------

let currentTime = 0;

const run = (input) => {
  currentTime = 0;
  const calls = [];

  const func = (arg) => {
    calls.push(`${arg}@${currentTime}`);
    console.log(calls);
  };

  const throttled = throttle(func, 3, { leading: true, trailling: true });
  input.forEach((call) => {
    const [arg, time] = call.split("@");
    setTimeout(() => throttled(arg), time);
  });
  return calls;
};

run(["A@0", "B@1"]);
