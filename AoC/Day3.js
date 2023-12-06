const fs = require('fs');

const input = fs.readFileSync('./AdventOfCode/Day3.txt', 'utf8');
const inputArray = input.split('\n');

const partNumbers = [];

for (let i = 0; i < inputArray.length; i++) {
    const line = inputArray[i];

    const lineArray = line.split(/[-*\/#&@=+%$.]/);

    // Test for x adjacent numbers  
    for (let y = 0; y < lineArray.length; y++) {
        const element = lineArray[y];

        if (/\d/.test(element)) {
            const lin = line.search(new RegExp(`\\b${element.replace(/\D/g, '')}\\b`));
            const right = inputArray[i][lin-1];
            const left = inputArray[i][lin + element.length];

            const filteredX = [right, left].join('').replace(/\./g, '')
            if (filteredX.length!==0) {
                console.log(i+1, element, [right, left])
                partNumbers.push(element)
            }
        }
    }

    // Test for y and diagonally adjacent numbers
    for (let y = 0; y < lineArray.length; y++) {
        const element = lineArray[y];
        var numberPattern = /^\d+$/;

        if (/\d/.test(element)) {
            const lin = line.search(new RegExp(`\\b${element}\\b`));
            const aboveElement = i != 0 ? inputArray[i-1]: '';
            const belowElement = i != inputArray.length - 1 ? inputArray[i+1]: '';

            const above = [];
            const below = [];

            for (let c = 0; c < element.split('').length; c++) {
                above.push(aboveElement[lin + c])
                below.push(belowElement[lin + c])
            }

            above.push(aboveElement[lin - 1])
            above.push(aboveElement[lin + element.length])
            below.push(belowElement[lin - 1])
            below.push(belowElement[lin + element.length])

            const filteredY = [...below, ...above].join('').replace(/\./g, '')
            if (filteredY.length!==0) {
                console.log(i+1, element, [...above, ...below])
                partNumbers.push(element)
            }

        }

    }

}

console.log(partNumbers.reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0))