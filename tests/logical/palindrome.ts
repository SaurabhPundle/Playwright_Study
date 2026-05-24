
// Palindrome test
// is a word, number, phrase or other sequence of characters that reads the same forward and backward, ignoring spaces, punctuation, and capitalization.
// madam,tenet,

// logic reverse word --> dont have revese method in string, so we can convert string to array and then reverse it and then join it back to string

//// case with string
// let word ="madam";

//// if we give number to check then

// let number = 12121; 
// let word = number.toString(); // convert number to string
                //[ 'M', 'a', 'd', 'o', 'm' ]
                //[ 'm', 'o', 'd', 'a', 'M' ]
                // modaM
// let reverseWord = word.split("").reverse().join("");    // split converts string to array, reverse reverses the array and join converts it back to string
// console.log(reverseWord);
// if ((word.toLowerCase()) === (reverseWord.toLowerCase())) {
//     console.log(`${word} is a palindrome`);
// } else {
//     console.log(`${word} is not a palindrome`);
// }

// case without convert it to string
// logic - extract last number using module operator and then divide the number by 10 to remove the last digit and repeat the process until the number becomes 0. In the process, we can build the reverse number and then compare it with the original number.

let num = 12121;
let originalNum = num; // store original number to compare later
let rem =0;
let reverseNum = 0;
while(num > 0) {
rem = num % 10; // extract last digit    1
reverseNum = reverseNum * 10 + rem; // build reverse number 0*10 + 1 = 1 to shift digit left and add new digit
num = Math.floor(num / 10); // remove last digit
}
console.log(reverseNum);
if (reverseNum === originalNum) {
    console.log(`${originalNum} is a palindrome`);
} else {
    console.log(`${originalNum} is not a palindrome`);
}