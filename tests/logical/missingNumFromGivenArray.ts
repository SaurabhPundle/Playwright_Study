//ts-node tests/logical/missingNumFromGivenArray.ts
let arr= [1,2,3,5];  // given array

let count = 10;  //find upto 10 values
let output = []  // empty array to store missing values

for(let i=1;i<=count;i++){
    if (!arr.includes(i)) {
        !arr.includes(i)?output.push(i):"";  // use ternary operator , if arr not inclues value of i then push it to th output array
        arr.push(i)
    }
}

    console.log(`Missing values in array ${output}`)
    console.log(`Whole values in array ${arr}`)
