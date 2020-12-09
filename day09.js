'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input).map(util.mapParseInt);
    for (let i = 25; i < lines.length; i++) {
        let num = lines[i];
        if (!isSumOfTwoInArray(num, lines.slice(i - 25, i))) {
            return num;
        }
    }
}

// Part 2
// ======

const part2 = input => {
    const sumToFind = part1(input);
    const lines = util.getLines(input).map(util.mapParseInt);

    for (let a = 0; a < lines.length; a++) {
        for (let b = 0; b < lines.length; b++) {
            let arr = lines.slice(a, b).map(util.mapParseInt);
            if (arr.length < 2) continue;
            let sum = util.sumArray(arr);
            if (sum === sumToFind) {
                // https://stackoverflow.com/a/32647733
                return Math.max.apply(Math, arr) + Math.min.apply(Math, arr);
            }
        }
    }
}

function isSumOfTwoInArray(test, arr) {
    for (let a of arr) {
        for (let b of arr) {
            if (a === b) continue;
            if (parseInt(a) + parseInt(b) === test) return true;
        }
    }
    return false;
}

module.exports = {part1, part2}
