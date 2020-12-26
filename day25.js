'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    return run(input);
}

// Part 2
// ======

const part2 = input => {
    // no part 2 :(
}

// https://github.com/caderek/aoc2020/blob/main/src/day25/index.ts
function run(input) {
    const lines = util.getLines(input);
    const divider = 20201227;
    const doorPublicKey = parseInt(lines[0].trim());
    const cardPublicKey = parseInt(lines[1].trim());

    let val = 1;
    let subject = 7;
    let loopSize = 0;

    let i = 0;
    while (true) {
        i++;
        val = val * subject;
        val = val % divider;

        if (val === cardPublicKey) {
            loopSize = i;
            break;
        }
    }

    val = 1;
    subject = doorPublicKey;

    while (loopSize-- > 0) {
        val = val * subject;
        val = val % divider;
    }

    return val;
}

module.exports = {part1, part2}
