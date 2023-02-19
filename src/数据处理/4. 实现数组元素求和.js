// arr=[1,2,3,4,5,6,7,8,9,10]，求和

function sum(arr) {
 return arr.reduce((cacl, item) => cacl + item, 0)
}

console.log(sum([1,2,3,4,5,6,7,8,9,10]))