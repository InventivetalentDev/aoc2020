'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input);
    const earliest = parseInt(lines[0]);
    const ids = lines[1].split(",").filter(i => i !== "x").map(util.mapParseInt);
    let time = earliest;

    while (true) {
        for (let id of ids) {
            if (time % id === 0) {
                console.log("id: " + id);
                console.log("time: " + time)
                let wait = time - earliest;
                console.log("wait: " + wait);
                return wait * id;
            }
        }
        time++;
    }
}

// Part 2
// ======

const part2 = input => {
    return input
}

module.exports = {part1, part2}
