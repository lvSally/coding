// https://bigfrontend.dev/problem/reorder-array-with-new-indexes

/**
 * @param {any[]} items
 * @param {number[]} newOrder
 * @return {void}
 */
function sort(items, newOrder) {
  // reorder items inline
  for(let i=0; i<newOrder.length-1; i++){
    let minIdx = i
    for(let j=i+1; j<newOrder.length; j++) {
      if(newOrder[i]>newOrder[j]) {
        minIdx = j
      }
    }
    [newOrder[i], newOrder[minIdx]] = [newOrder[minIdx], newOrder[i]];
    [items[i], items[minIdx]] = [items[minIdx], items[i]];
  }
}

sort(['A', 'B', 'C', 'D', 'E', 'F'], [1,   5,   4,   3,   2,   0])