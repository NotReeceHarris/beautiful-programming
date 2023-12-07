// red, green, or blue
// like 3 red, 5 green, 4 blue

const fs = require('fs');

const input = fs.readFileSync('./AoC/Day2.txt', 'utf8');
const inputArray = input.split('\n');
inputArray.pop();


let games = [];

function getCubes(game, color) {
    const redIndexes = game.split(', ').reduce((result, current, index) => {
        if (current.includes(color)) {
            result.push(index);
        }
        return result;
    }, []);

    const space = game.split(', ')[redIndexes[0]]

    if (space !== undefined) {
        return parseInt(space.split(' ')[0])
    }

    return 0;

}


for (let i = 0; i < inputArray.length; i++) {
    const line = inputArray[i].split('; ');

    const id = line[0].split(' ')[1].replace(':', '');
    line[0] = line[0].split(': ')[1];

    const subgames = [];

    for (let s = 0; s < line.length; s++) {
        const subGame = line[s];
        subgames.push({
            red: getCubes(subGame, 'red'),
            green: getCubes(subGame, 'green'),
            blue: getCubes(subGame, 'blue')
        })
    }

    games.push({
        id: id,
        subgames,
        minimum: {
            red: Math.max(...subgames.map(subgame => subgame.red)),
            green: Math.max(...subgames.map(subgame => subgame.green)),
            blue: Math.max(...subgames.map(subgame => subgame.blue))
        },
        powerOfMins: Math.max(...subgames.map(subgame => subgame.red)) * Math.max(...subgames.map(subgame => subgame.green)) * Math.max(...subgames.map(subgame => subgame.blue))
    })

}

const sumOfPowers = games.reduce((result, current) => {
    return result + parseInt(current.powerOfMins);
}, 0);

console.log(games)
console.log(sumOfPowers)