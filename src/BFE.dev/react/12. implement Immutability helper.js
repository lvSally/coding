const isObject = (data) => {
  return typeof data === 'object' && data !== null
}
/**
 * @param {any} data
 * @param {Object} command
 */
function update(data, command) {
  // for simple cases, which $command is in the first layer
  if ('$push' in command) {
    if (!Array.isArray(data)) {
      throw new Error('not array')
    }

    return [...data, ...command['$push']]
  }

  if ('$merge' in command) {
    if (!isObject(data)) {
      throw new Error('not object for $merge')
    }

    return {
      ...data,
      ...command['$merge']
    }
  }

  if ('$apply' in command) {
    return command['$apply'](data)
  }

  if ('$set' in command) {
    return command['$set']
  }

  // for cases with path

  // first shallow copy
  if (!isObject(data)) {
    throw new Error('not object for complex data')
  }

  const newData = Array.isArray(data) ? [...data] : {...data}

  for (const key of Object.keys(command)) {
    newData[key] = update(newData[key], command[key])
  }

  return newData
}

// const arr = [1, 2, 3, 4];
// const newArr = update(arr, {
//   0: { $apply: (item) => item * 2 },
//   1: { $apply: (item) => item * 2 },
// });
const state = {
  a: {
    b: {
      c: 1,
    },
  },
  d: 2,
};

const newState = update(state, { a: { b: { c: { $set: 3 } } } });
console.log(newState);

// 1 遇到 line34: return command['$set'] 开始出栈; 出栈的返回值为command['$set']=3
// 2 将返回值用于出栈操作
// 3 每次出栈时都会返回newData，newData 依次对应 { c: { $set: 3 } }, { b: { c: { $set: 3 } } }, { a: { b: { c: { $set: 3 } } } }
// 4 出栈完成，得到最终返回值
