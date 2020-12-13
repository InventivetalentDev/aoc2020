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
    const lines = util.getLines(input);
    const ids = lines[1].split(",").map(i => {
        if (i === "x") return 1;
        return parseInt(i);
    })

    // https://github.com/xiel/advent-of-code/blob/main/src/Day%2013%20-%20Shuttle%20Search/Day13.test.ts#L74
    let inc = ids[0];
    let index = 1;
    let time = inc;
    while (index < ids.length) {
        if ((time + index) % ids[index] === 0) {
            inc *= ids[index];
            index++;
        } else {
            time += inc;
        }
    }
    return time;
}

module.exports = {part1, part2}
