// reference: https://juejin.cn/post/6844904147884441608#heading-1

class MyPromise1 {
  constructor(executor) {
    this.value = null
    this.reason = null

    this.onFulfilled = null
    this.onRejected = null

    let resolve = (value) => {
      this.value = value
      this.onFulfilled && this.onFulfilled(this.value)
    }

    let reject = (reason) => {
      this.reason = reason
      this.onRejected && this.rejected(this.reason)
    }
    try{
      executor(resolve, reject)
    }catch(err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  }
}

/**
 * 异步实现
 */
const resolvePromise = (promise2, x, resolve, reject) => {
  if(x === promise2){
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  let called;
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
          if(called)return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if(called)return;
          called = true;
          reject(err);
        })
      } else {
        // if(called)return;
        // called = true;
        resolve(x);
      }
    } catch (e) {
      if(called)return;
      called = true;
      reject(e); 
    }
  } else {
    resolve(x);
  }
}

class MyPromise {
  static PENDING = "pending";
  static RESOLVED = "resolved";
  static REJECTED = "rejected";

  static resolve = (val) => {
    return new MyPromise((resolve, reject) => {
      resolve(val);
    });
  };

  static reject = (val) => {
    return new MyPromise((resolve, reject) => {
      reject(val);
    });
  };

  static all = (promises) => {
    return new MyPromise((resolve, reject) => {
      let result = [];
      let count = 0;

      for (let i = 0; i < promises.length; i++) {
        promises[i].then(data => {
          result[i] = data;
          if (++count == promises.length) {
            resolve(result);
          }
        }, error => {
          reject(error);
        });
      }
    });
  }

  static race = (promises) => {
    return new Promise((resolve,reject)=>{
      for(let i = 0; i < promises.length; i++){
        promises[i].then(resolve,reject)
      };
    })
  }

  static allSettled = (promises) => {
    return new MyPromise((resolve) => {
      let result = [];
      let count = 0;
      for (let i = 0; i < promises.length; i++) {
        promises[i].finally(res => {
          result[i] = res;
          if (++count == promises.length) {
            resolve(result);
          }
        })
      }
    });
  }

  constructor(executor) {
    this.status = MyPromise.PENDING;
    this.value = null;
    this.reason = null;

    // this.onFulfilled = null;
    // this.onRejected = null;
    this.onFulfilledQueues = [];
    this.onRejectedQueues = [];

    let resolve = (value) => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.RESOLVED;
        this.value = value;
        this.onFulfilledQueues.forEach((fn) => fn(this.value));
      }
    };

    let reject = (reason) => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.REJECTED;
        this.reason = reason;
        this.onRejectedQueues.forEach((fn) => fn(this.reason));
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.PENDING) {
        this.onFulfilledQueues.push((value) => {
          setTimeout(() => {
            let x = onFulfilled(value);
            resolvePromise(promise2, x, resolve, reject);
          });
          // let x = onFulfilled(value);
          // resolvePromise(promise2, x, resolve, reject);
        });
        this.onRejectedQueues.push((reason) => {
          setTimeout(() => {
            let x = onRejected(reason);
            resolvePromise(promise2, x, resolve, reject);
          });
          // let x = onRejected(reason);
          // resolvePromise(promise2, x, resolve, reject);
        });
      }

      if (this.status === MyPromise.RESOLVED) {
        setTimeout(() => {
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        });
        // let x = onFulfilled(this.value);
        // resolvePromise(promise2, x, resolve, reject);
      }

      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        });
        // let x = onRejected(this.reason);
        // resolvePromise(promise2, x, resolve, reject);
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(fn) {
    return this.then(fn, fn);
  }
}


// init
// let promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(123)
//   }, 1000)
// })

// // callback
// promise.then((value) => {
//   console.log(value)
// })

// const p1 = new MyPromise((resolved, rejected) => {
//   resolved('resolved');  
// });

// p1.then((res) => {
//   console.log(res);
//   return 'then1';
// })
// .then((res) => {
//   console.log(res);
//   return 'then2';
// })
// .then((res) => {
//   console.log(res);
//   return 'then3';
// })

const p1 = new MyPromise((resolved, rejected) => {
  resolved('我 resolved 了');  
});

p1.then((res) => {
  console.log(res);
  return new MyPromise((resolved, rejected) => {
    setTimeout(() => {
      resolved("then1");
    }, 1000);
  });
})
  .then((res) => {
    console.log(res);
    return new MyPromise((resolved, rejected) => {
      setTimeout(() => {
        resolved("then2");
      }, 1000);
    });
  })
  .then((res) => {
    console.log(res);
    return "then3";
  })

// const p1 = new MyPromise((resolved, rejected) => {
//   resolved('resolved');
// })

// p1.then((res) => {
//   return new MyPromise((resolved, rejected) => {
//     setTimeout(() => {
//       rejected('错误了');
//     }, 1000)
//   });
// })
// .then((res) => {
//   return new MyPromise((resolved, rejected) => {
//     setTimeout(() => {
//       resolved('then2');
//     }, 1000)
//   });
// })
// .then((res) => {
//   return 'then3';
// }).catch(error => {
//   console.log('----error', error);
// })