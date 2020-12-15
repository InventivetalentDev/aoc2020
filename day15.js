'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    return run(input.split(",").map(util.mapParseInt), 2020, true);
}

// Part 2
// ======

const part2 = input => {
    // This is gonna take a while lol
    return run(input.split(",").map(util.mapParseInt), 30000000, false);
}

function run(input, search, doLog) {
    let log = doLog;
    let turn = 0;
    let spoken = new Array(30000000);
    while (turn < search) {
        if (!doLog) {
            log = turn % 100000 === 0 || turn > 29999995;
        }
        // if (spoken.length > 1000) {
        //      spoken.shift();
        // }
        let s = 0;
        if (input.length > turn) {
            s = input[turn];
            if (log) console.log((turn + 1) + " Speak, Start " + s);
        } else {
            let last = spoken[turn - 1];
            let lastTime = spoken.lastIndexOf(last, turn - 2);
            if (lastTime < 0) {
                s = 0; // first time spoken
                if (log) console.log((turn + 1) + " Speak, First " + s + " (" + last + ")")
            } else {
                s = turn - 1 - lastTime;
                if (log) console.log((turn + 1) + " Speak, Again " + s + " (" + lastTime + ")")
            }
        }
        spoken[turn] = s;
        turn++;
    }
    return spoken[turn - 1];
}

module.exports = {part1, part2}
