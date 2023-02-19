// This is a JavaScript coding problem from BFE.dev

/**
 * @param {string[][]} message
 * @return {string}
 */
function decode(message) {
  if (message.length === 0) return "";
  // your code here
  let left = 0,
    right = message[0].length - 1,
    top = 0,
    bottom = message.length - 1;
  let direction = "down",
    str = "";
  while (left <= right) {
    if (direction === "down") {
      for (let i = 0; i <= bottom; i++) {
        str += message[i][left];
        if (++left > right) {
          return str
        }
      }
      direction = "up";
    } else {
      for (let i = bottom-1; i > 0; i--) {
        str += message[i][left];
        if (++left > right) {
          return str;
        }
      }
      direction = "down";
    }
  }

  return str;
}

let arr = [
  ["I", "B", "C", "A", "L", "K", "A"],
  ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
  ["G", "H", "O", "E", "L", "A", "D"],
];

// IROCLED
// I B C A L K A
// D R F C A E A
// G H O E L A D 

console.log(decode(arr), 111);
