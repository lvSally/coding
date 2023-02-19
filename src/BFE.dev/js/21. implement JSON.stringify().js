function stringify(data) {
  if(typeof data === 'number' || typeof data === 'string' || typeof data === 'boolean') {
    return `${data}`
  }
  if([Infinity, -Infinity, null, undefined].indexOf(data)>-1) {
    return 'null'
  }
  if(typeof data === 'function') {
    return undefined
  }

  if(data !== data) {
    return 'null'
  }

  if(typeof data === 'symbol') {
    return null
  }

  if(data instanceof Date){
    return `${data.toISOString()}`
  }
  if(data instanceof Array) {
    arr = data.map(item => stringify(item))
    return `[${arr.join(',')}]`
  }
  if(data instanceof Object) {
    const arr = Object.entries(data).reduce((accumulator, [key, value]) => {
      if(value === undefined) {
        return accumulator
      }
      accumulator.push(`"${key}":${stringify(value)}`)
      return accumulator
    }, [])

    return `{${arr.join(",")}}`;
  }
}

console.log(stringify({ a: 1, b: [1, 2, { s: "sss" }], c: false }));