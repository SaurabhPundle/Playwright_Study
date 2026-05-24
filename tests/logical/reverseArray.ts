let arr1 = [1,2,3,4,5];

// let arr2 = arr1.reverse(); // reverse method reverses the array in place and returns the reference to the same array
// let arr2 = [...arr1].reverse(); // spread operator creates a shallow copy of the array and then reverse it, so that original array remains unchanged
// let arr2 = arr1.slice().reverse(); // slice method creates a shallow copy of the array and then reverse it, so that original array remains unchanged
let arr2 = Array.from(arr1).reverse
console.log(arr1);
console.log(arr2);