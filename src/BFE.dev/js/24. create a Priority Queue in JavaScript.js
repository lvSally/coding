// complete the implementation
class PriorityQueue {
  /**
   * @param {(a: any, b: any) => -1 | 0 | 1} compare -
   * compare function, similar to parameter of Array.prototype.sort
   */
  constructor(compare = (a, b) => a - b) {
    this.compare = (a, b) => compare(a, b) > 0;
    this.heap = []
  }

  parentIdxFn(idx) {
    return Math.floor((idx - 1) / 2);
  }
  leftIdxFn(idx) {
    return idx * 2 + 1;
  }
  rightIdxFn(idx) {
    return idx * 2 + 2;
  }

  /**
   * return {number} amount of items
   */
  size() {
    return this.heap.length
  }

  /**
   * returns the head element
   */
  peek() {
    return this.heap[0]
  }

  /**
   * @param {any} element - new element to add
   */
  add(element) {
    this.heap.push(element)
    if(this.heap.length > 1) {
      this.moveUp(this.heap.length - 1);
    }
  }

  moveUp(idx) {
    if(idx === 0) {
      return
    }
    const parentIdx = this.parentIdxFn(idx)
    if(this.compare(this.heap[parentIdx], this.heap[idx])) {
      this.swap(idx, parentIdx);
      this.moveUp(parentIdx);
    }
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  /**
   * remove the head element
   * @return {any} the head element
   */
  poll() {
    let root = this.heap.shift()
    this.heap.unshift(this.heap.pop())
    this.moveDown(0)
    return root
  }
  moveDown(idx) {
    // const leftIdx = this.leftIdxFn(idx);
    // const rightIdx = this.rightIdxFn(idx);
    // let childIdx = this.compare(this.heap[leftIdx], this.heap[rightIdx])
    //   ? rightIdx
    //   : leftIdx;
    // this.swap(this.heap[idx], this.heap[childIdx]);
    // idx = childIdx
    // moveDown(idx);
    let childIdx  = this.getChildIdxOrNomre(idx)
    if(childIdx !== idx) {
      this.swap(idx, childIdx)
      this.moveDown(childIdx)
    }
  }
  getChildIdxOrNomre(index) {
    const left = this.leftIdxFn(index);
    const right = this.rightIdxFn(index);
    if (left < this.heap.length && this.compare(this.heap[index], this.heap[left])) {
        index = left;
    }
  
    if (right < this.heap.length && this.compare(this.heap[index], this.heap[right])) {
        index = right;
    }
    return index;
  }
}

/**
* Testing
*/
const pq = new PriorityQueue((a, b) => a - b)
// (a, b) => a - b means
//returns        1    if    a    has    higher    priority,
//returns        0    if    both    have    the    same    priority
//returns        -1    if    b    has    higher    priority.
// smaller numbers are closer to index:0
// which means smaller number are to be removed sooner

pq.add(5); // now 5 is the only element
pq.add(2); // 2 added
console.log(pq.peek()); // 2, since smaller number are sooner to be removed
pq.add(1); // 1 added
console.log(pq.peek()); // 1, since smaller number are sooner to be removed
console.log(pq.poll()); // 1 is removed, 2 and 5 are left
console.log(pq.peek());// 2 is the smallest now, this returns 2
console.log(pq.poll()); // 2 is removed, only 5 is left