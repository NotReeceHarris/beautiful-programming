const fs = require('fs');

const input = fs.readFileSync('./AoC/Day1.txt', 'utf8');
const inputArray = input.split('\n');

let  overall = 0;

for (let i = 0; i < inputArray.length; i++) {
    const line = inputArray[i];


    const numbers = line.split('').filter(char => !isNaN(char));
    let number;

    if (numbers.length === 0) {
        continue;
    }

    if (numbers.length === 1) {
        number = `${numbers[0]}${numbers[0]}`;
    } else {
        const firstChar = numbers[0];
        const lastChar = numbers[numbers.length - 1];

        number = `${firstChar}${lastChar}`
    }

    console.log(number)
    overall += parseInt(number);
    
}

console.log(overall)