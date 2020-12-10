'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input).map(util.mapParseInt);
    let sorted = lines.sort((a, b) => { // without comparator js just sorts strings :tableflip:
        return a - b;
    });
    let diff1 = 0;
    let diff3 = 0;
    let last = 0;
    for (let a of sorted) {
        let diff = a - last;
        if (diff === 3) {
            diff3++;
        } else if (diff === 1) {
            diff1++;
        }

        last = a;
    }
    diff3++; // device
    console.log("1: " + diff1);
    console.log("3: " + diff3);
    return diff1 * diff3;
}

// Part 2
// ======

const part2 = input => {
    const lines = util.getLines(input).map(util.mapParseInt);
    return countArrangements(lines);
}

// stolen from https://github.com/arothuis/aoc2020/blob/main/src/10/10.js for part 2
function countArrangements(arr, current = 0, seen = {}) {
    if (seen[current]) {
        return seen[current];
    }

    let options = getNext(current, arr);
    if (options.length <= 0) {
        return seen[current] = 1;
    }

    return seen[current] = options.reduce((acc, x) => acc + countArrangements(arr, x, seen), 0);
}

function getNext(current, arr) {
    return [current + 1, current + 2, current + 3].filter(a => arr.includes(a));
}

module.exports = {part1, part2}
