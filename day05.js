'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    let highest = 0;
    for (let id of getAllSeatIds(input)) {
        if (id > highest) {
            highest = id;
        }
    }
    return highest;
}

// Part 2
// ======

const part2 = input => {
    let highest = part1(input);
    let all = getAllSeatIds(input);
    let missing = [];
    for (let i = 0; i < highest; i++) {
        if (!all.includes(i)) {
            missing.push(i);
        }
    }
    return missing;
}

function getAllSeatIds(input) {
    const lines = util.getLines(input);
    let ids = [];
    for (let line of lines) {
        let parsed = parseRowCol(line);
        let id = parsed.row * 8 + parsed.col;
        ids.push(id);
    }
    return ids;
}

function parseRowCol(inp) {
    let row = parseRow(inp.substr(0, 7));
    let col = parseCol(inp.substr(7, 3));
    return {row, col};
}

function parseRow(inp) {
    return parse(inp, 127, "F", "B");
}

function parseCol(inp) {
    return parse(inp, 7, "L", "R");
}

function parse(inp, max, lower, higher) {
    let start = 0;
    let end = max;
    let mid = 0;
    let last = "";
    for (let s of inp) {
        mid = (start + end) / 2;
        if (s === lower) { // front/left -> first half
            end = Math.floor(mid);
        } else if (s === higher) { // back/right -> last half
            start = Math.ceil(mid);
        }
        last = s;
    }
    if (last === lower) {
        return start;
    }
    if (last === higher) {
        return end;
    }
    return Math.round(mid);
}

module.exports = {part1, part2}
