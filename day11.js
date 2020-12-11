'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    let originalLines = util.getLines(input);
    let changesLastCycle = 1;
    while (true) {
        // make a copy since we want to change everything at once without affecting decisions in the current cycle
        let iteratorLines = JSON.parse(JSON.stringify(originalLines));
        for (let y = 0; y < iteratorLines.length; y++) {
            for (let x = 0; x < iteratorLines.length; x++) {
                let seat = getSeat(iteratorLines, x, y);
                let occupiedAdjacent = 0;
                forEachAdjacent(iteratorLines, x, y, adjacentSeat => {
                    if (adjacentSeat === "#") {
                        occupiedAdjacent++;
                    }
                });
                // make changes to original
                if (seat === "L" && occupiedAdjacent <= 0) {
                    setSeat(originalLines, x, y, "#");
                    changesLastCycle++;
                }
                if (seat === "#" && occupiedAdjacent >= 4) {
                    setSeat(originalLines, x, y, "L");
                    changesLastCycle++;
                }
            }
        }
        if (changesLastCycle <= 0) {
            break;
        }
        changesLastCycle = 0;
    }
    console.log(originalLines);
    let occupied = 0;
    for (let y = 0; y < originalLines.length; y++) {
        for (let x = 0; x < originalLines.length; x++) {
            if (getSeat(originalLines, x, y) === "#") occupied++;
        }
    }
    return occupied;
}

// Part 2
// ======

const part2 = input => {
    return input
}

function getWidthHeight(lines) {
    const width = lines[0].length;
    const height = lines.length;
    return {width, height};
}

function getSeat(lines, x, y) {
    let line = lines[y];
    if (!line) return undefined;
    return line[x];
}

function setSeat(lines, x, y, v) {
    // https://stackoverflow.com/a/1431110
    let line = lines[y];
    if (!line) return;
    line = line.substring(0, x) + v + line.substring(x + 1);
    lines[y] = line;
}

function forEachAdjacent(lines, x, y, cb) {
    const {width, height} = getWidthHeight(lines);
    const adjacent = [
        [-1, -1],
        [-1, 0],
        [-1, 1],

        [0, -1],
        // center
        [0, 1],

        [1, -1],
        [1, 0],
        [1, 1]
    ];

    for (let ap of adjacent) {
        let sx = x + ap[0];
        let sy = y + ap[1];
        if (sx < 0 || sy < 0 || sx >= width || sy >= height) continue;
        cb(getSeat(lines, sx, sy), sx, sy);
    }
}

module.exports = {part1, part2}
