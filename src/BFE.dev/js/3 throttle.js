function throttle_step1(cb, delay = 1000) {
  let shouldWait = false
  return (...args) => {
    if(shouldWait) {
      return
    }

    cb(...args)
    shouldWait = true
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}

function throttle_step2(cb, delay = 1000) {
  let shouldWait = false, waitingArgs = null
  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return;
    }

    cb(...args);
    shouldWait = true;

    setTimeout(() => {
      if(waitingArgs) {
        cb(...waitingArgs)
        waitingArgs = null
      } else {
         shouldWait = false;
      }
    }, delay);
  };
}

function throttle_step3(cb, delay = 1000) {
  let shouldWait = false,
    waitingArgs = null;

  const timeoutFunc = () => {
    if (waitingArgs) {
        cb(...waitingArgs);
        waitingArgs = null;
        setTimeout(timeoutFunc, delay);
      } else {
        shouldWait = false;
      }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}
