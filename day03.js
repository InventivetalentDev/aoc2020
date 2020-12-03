'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input);
    return countTreesInSlope(lines, 3, 1);
}

// Part 2
// ======

const part2 = input => {
    let lines = util.getLines(input);
    let counts = [
        countTreesInSlope(lines, 1, 1),
        countTreesInSlope(lines, 3, 1),
        countTreesInSlope(lines, 5, 1),
        countTreesInSlope(lines, 7, 1),
        countTreesInSlope(lines, 1, 2)
    ];
    console.log(counts);
    return util.multiplyArray(counts);
}

function countTreesInSlope(lines, xs, ys) {
    let trees = 0;
    let x = 0;
    let y = 0;
    while (y < lines.length) {
        let cell = getLineCell(lines[y], x);
        if (cell === "#") trees++;
        x += xs;
        y += ys;
    }
    return trees;
}

function getLineCell(line, c) {
    return line.substr(c % line.length, 1);
}

module.exports = {part1, part2}
