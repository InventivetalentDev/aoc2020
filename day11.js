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
    return countOccupied(originalLines);
}

// Part 2
// ======

const part2 = input => {
    let originalLines = util.getLines(input);
    let changesLastCycle = 1;
    while (true) {
        // make a copy since we want to change everything at once without affecting decisions in the current cycle
        let iteratorLines = JSON.parse(JSON.stringify(originalLines));
        for (let y = 0; y < iteratorLines.length; y++) {
            for (let x = 0; x < iteratorLines.length; x++) {
                let seat = getSeat(iteratorLines, x, y);
                if (seat === ".") continue;
                let occupiedVisible = 0;
                forEachFirstInAllDirections(iteratorLines, x, y, visibleSeat => {
                    if (visibleSeat === "#") {
                        occupiedVisible++;
                    }
                });
                // make changes to original
                if (seat === "L" && occupiedVisible <= 0) {
                    setSeat(originalLines, x, y, "#");
                    changesLastCycle++;
                }
                if (seat === "#" && occupiedVisible >= 5) {
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
    return countOccupied(originalLines);
}

function countOccupied(lines) {
    let occupied = 0;
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines.length; x++) {
            if (getSeat(lines, x, y) === "#") occupied++;
        }
    }
    return occupied;
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
    line = util.setChar(line, x, v);
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

function forEachFirstInAllDirections(lines, x, y, cb) {
    const {width, height} = getWidthHeight(lines);
    const directions = [
        [0, -1], // up
        [1, -1], // right up
        [1, 0], // right
        [1, 1], // right down
        [0, 1], // down
        [-1, 1], // left down
        [-1, 0], // left
        [-1, -1] // left up
    ];

    for (let dir of directions) {
        let sx = x;
        let sy = y;
        for (let step = 0; step < (width * height); step++) {
            sx += dir[0];
            sy += dir[1];
            if (sx < 0 || sy < 0 || sx >= width || sy >= height) break;
            let seat = getSeat(lines, sx, sy);
            if (seat !== ".") { // first seat they see
                cb(seat, sx, sy);
                break;
            }
        }
    }
}

module.exports = {part1, part2}
