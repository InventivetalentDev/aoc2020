'use strict'

const util = require("./util");

const UP = 1;
const DOWN = -1;
const SOUTH = 1;
const NORTH = -1;
const EAST = 1;
const WEST = -1;

const shift = [
    [0, 0, UP], // up
    [0, 0, DOWN], // down

    [EAST, 0, UP], // up, east
    [0, SOUTH, UP], // up, south
    [WEST, 0, UP], // up, west
    [0, NORTH, UP], // up, north

    [EAST, SOUTH, UP], // up, south east
    [WEST, SOUTH, UP], // up, south west
    [EAST, NORTH, UP], // up, north east
    [WEST, NORTH, UP], // up, north west

    [0, NORTH, 0], // north
    [0, SOUTH, 0], // south
    [WEST, 0, 0], // west
    [EAST, 0, 0], // east

    [EAST, SOUTH, 0], // south east
    [WEST, SOUTH, 0], // south west
    [EAST, NORTH, 0], // north east
    [WEST, NORTH, 0], // north west

    [EAST, 0, DOWN], // down, east
    [0, SOUTH, DOWN], // down, south
    [WEST, 0, DOWN], // down, west
    [0, NORTH, DOWN], // down, north

    [EAST, SOUTH, DOWN], // down, south east
    [WEST, SOUTH, DOWN], // down, south west
    [EAST, NORTH, DOWN], // down, north east
    [WEST, NORTH, DOWN], // down, north west
];


// Part 1
// ======

const part1 = input => {
    let state = parse(input);
    console.log(JSON.stringify(state, null, 2))
    print(state)
    state = run(state, 6);
    console.log(JSON.stringify(state, null, 2))
    return count(state);
}

// Part 2
// ======

const part2 = input => {
    return input
}

function run(initialState, cycles) {
    let state = initialState;

    for (let c = 0; c < cycles; c++) {
        console.log("c=" + c);
        let stateCopy = JSON.parse(JSON.stringify(state)); // write only to copy
        for (let z = state.min; z < state.max; z++) {
            for (let y = state.min; y < state.max; y++) {
                for (let x = state.min; x < state.max; x++) {
                    let {active, inactive} = countNeighbours(state, x, y, z);
                    if (get(state, x, y, z) === true) {
                        // currently active
                        if (active === 2 || active === 3) {
                            // remains active
                        } else {
                            // becomes inactive
                            set(stateCopy, x, y, z, false);
                        }
                    } else {
                        // currently inactive
                        if (active === 3) {
                            // becomes active
                            set(stateCopy, x, y, z, true);
                        }
                    }
                }
            }
        }

        state = JSON.parse(JSON.stringify(stateCopy));
        print(state);
    }

    return state;
}

function print(state) {
    for (let z = state.min; z < state.max; z++) {
        console.log("z=" + z);
        for (let y = state.min; y < state.max; y++) {
            let line = "";
            for (let x = state.min; x < state.max; x++) {
                line += get(state, x, y, z) ? "#" : ".";
            }
            console.log(line);
        }
        console.log("");
    }
}

function parse(input) {
    const lines = util.getLines(input);
    let xSize = lines[0].length;
    let ySize = lines.length;
    let zSize = ySize;

    let size = Math.ceil((xSize + ySize + zSize) / 3)
    let mid = Math.ceil(size / 2);

    let data = {};
    let state = {
        data: data,
        min: -mid,
        max: mid
    };
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            for (let z = 0; z < size; z++) {
                set(state, x - mid, y - mid, z - mid, false);
            }
            if (typeof lines[y] !== "undefined") {
                set(state, x - mid, y - mid, 0, lines[y][x] === "#");
            }
        }
    }
    return state;
}

function countNeighbours(state, x, y, z) {
    let active = 0;
    let inactive = 0;
    for (let sh of shift) {
        if (get(state, x + sh[0], y + sh[1], z + sh[2]) === true) {
            active++;
        } else {
            inactive++;
        }
    }
    return {active, inactive};
}

function count(state) {
    let active = 0;
    let inactive = 0;
    for (let z = state.min; z < state.max; z++) {
        for (let y = state.min; y < state.max; y++) {
            for (let x = state.min; x < state.max; x++) {
                if (get(state, x, y, z) === true) {
                    active++;
                } else {
                    inactive++;
                }
            }
        }
    }
    return {active, inactive};
}

function set(state, x, y, z, v) {
    let absz = Math.abs(z);
    if (absz >= state.max || -absz <= state.min) {
        state.max = absz;
        state.min = -absz - 1;
    }

    let zd = state.data[z];
    if (!zd) {
        zd = {};
    }
    let yd = zd[y];
    if (!yd) {
        yd = {};
    }
    yd[x] = v;
    zd[y] = yd;
    state.data[z] = zd;
}

function get(state, x, y, z) {
    let absz = Math.abs(z);
    if (absz >= state.max || -absz <= state.min) {
        state.max = absz;
        state.min = -absz - 1;
    }

    let zd = state.data[z];
    if (!zd) {
        return undefined;
    }
    let yd = zd[y];
    if (!yd) {
        return undefined;
    }
    return yd[x];
}

function index(state, x, y, z) {
    return (x + 1000) + state.width * ((y + 1000) + state.length * (z + 1000));
}

module.exports = {part1, part2}
