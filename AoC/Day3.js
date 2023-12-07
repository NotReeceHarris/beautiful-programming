const fs = require('fs');

const input = fs.readFileSync('./AoC/Day3.txt', 'utf8');
const inputArray = input.split('\n');

const partNumbers = {};

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
                if (`${i}-${element}` in partNumbers) {
                    partNumbers[`${i}-${element}`].connections.push(right, left)
                } else {
                    partNumbers[`${i}-${element}`] = {
                        partNumber: element,
                        connections: [right, left]
                    }
                }
            }
        }
    }

    // Test for y and diagonally adjacent numbers
    for (let y = 0; y < lineArray.length; y++) {
        const element = lineArray[y];
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

                const data = [].filter(function( element ) {
                    return element !== undefined;
                 });

                if (`${i}-${element}` in partNumbers) {
                    partNumbers[`${i}-${element}`].connections.push(...above, ...below)
                } else {
                    partNumbers[`${i}-${element}`] = {
                        partNumber: element,
                        connections: [...above, ...below]
                    }
                }
            }

        }

    }

}

console.log(partNumbers)
console.log(Object.values(partNumbers).reduce((partialSum, a) => partialSum + parseInt(a.partNumber), 0))