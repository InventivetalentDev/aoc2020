'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    let lines = util.getLines(input);
    for (let lineA of lines) {
        for (let lineB of lines) {
            let a = parseInt(lineA);
            let b = parseInt(lineB);
            if (a + b === 2020) {
                return a * b;
            }
        }
    }
}

// Part 2
// ======

const part2 = input => {
    let lines = util.getLines(input);
    for (let lineA of lines) {
        for (let lineB of lines) {
            for (let lineC of lines) {
                let a = parseInt(lineA);
                let b = parseInt(lineB);
                let c = parseInt(lineC);
                if (a + b + c === 2020) {
                    return a * b * c;
                }
            }
        }
    }
}

module.exports = {part1, part2}
