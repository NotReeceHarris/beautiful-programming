const fs = require('fs');

const input = fs.readFileSync('./AoC/Day1.txt', 'utf8');
const inputArray = input.split('\n');

const calNumbers = [];

const numberWords = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

for (let i = 0; i < inputArray.length; i++) {
    let line = inputArray[i];
    if (line === '') {
        continue;
    }

    const output = Array.from({ length: line.length })
    
    for (let i = 0; i < line.split('').length; i++) {
        const char = line.split('')[i];

        if (!isNaN(+char)) {
            output[i] = char;
        }
    }

    for (const [key, value] of Object.entries(numberWords)) {
        const regex = new RegExp(key, 'g');
        const foundMatches = line.matchAll(regex);

        if (foundMatches) {
            for (const match of foundMatches) {
                output[match.index] = value;
            }
    
        }
    }

    const outputString = output.join('');
    let sumString;

    if (outputString.length === 1) {
        sumString = parseInt(`${outputString}${outputString}`)
    } else {
        const firstChar = outputString[0];
        const lastChar = outputString[outputString.length - 1];
        sumString = parseInt(`${firstChar}${lastChar}`)
    }

    calNumbers.push(sumString)

}

console.log(calNumbers.reduce((partialSum, a) => partialSum + a, 0))
