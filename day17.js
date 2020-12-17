'use strict'

const util = require("./util");

const UP = 1;
const DOWN = -1;
const SOUTH = 1;
const NORTH = -1;
const EAST = 1;
const WEST = -1;


// Part 1
// ======

const part1 = input => {
    let state = parse3(input);
    console.log(JSON.stringify(state, null, 2))
    print3(state)
    state = run3(state, 6);
    console.log(JSON.stringify(state, null, 2))
    return count3(state);
}

// Part 2
// ======

const part2 = input => {
    let state = parse4(input);
    console.log(JSON.stringify(state, null, 2))
    print4(state)
    state = run4(state, 6);
    // console.log(JSON.stringify(state, null, 2))
    return count4(state);
}

function run3(initialState, cycles) {
    let state = initialState;

    for (let c = 0; c < cycles; c++) {
        console.log("c=" + c);
        let stateCopy = JSON.parse(JSON.stringify(state)); // write only to copy
        for (let z = state.min; z < state.max; z++) {
            for (let y = state.min; y < state.max; y++) {
                for (let x = state.min; x < state.max; x++) {
                    let {active, inactive} = countNeighbours3(state, x, y, z);
                    if (get3(state, x, y, z) === true) {
                        // currently active
                        if (active === 2 || active === 3) {
                            // remains active
                        } else {
                            // becomes inactive
                            set3(stateCopy, x, y, z, false);
                        }
                    } else {
                        // currently inactive
                        if (active === 3) {
                            // becomes active
                            set3(stateCopy, x, y, z, true);
                        }
                    }
                }
            }
        }

        state = JSON.parse(JSON.stringify(stateCopy));
        print3(state);
    }

    return state;
}

function run4(initialState, cycles) {
    let state = initialState;

    for (let c = 0; c < cycles; c++) {
        console.log("c=" + c);
        let stateCopy = JSON.parse(JSON.stringify(state)); // write only to copy
        for (let w = state.min; w < state.max; w++) {
            for (let z = state.min; z < state.max; z++) {
                for (let y = state.min; y < state.max; y++) {
                    for (let x = state.min; x < state.max; x++) {
                        let {active, inactive} = countNeighbours4(state, x, y, z, w);
                        if (get4(state, x, y, z, w) === true) {
                            // currently active
                            if (active === 2 || active === 3) {
                                // remains active
                            } else {
                                // becomes inactive
                                set4(stateCopy, x, y, z, w, false);
                            }
                        } else {
                            // currently inactive
                            if (active === 3) {
                                // becomes active
                                set4(stateCopy, x, y, z, w, true);
                            }
                        }
                    }
                }
            }
        }

        state = JSON.parse(JSON.stringify(stateCopy));
        print4(state);
    }

    return state;
}

function print3(state) {
    for (let z = state.min; z < state.max; z++) {
        console.log("z=" + z);
        for (let y = state.min; y < state.max; y++) {
            let line = "";
            for (let x = state.min; x < state.max; x++) {
                line += get3(state, x, y, z) ? "#" : ".";
            }
            console.log(line);
        }
        console.log("");
    }
}

function print4(state) {
    for (let w = state.min; w < state.max; w++) {
        for (let z = state.min; z < state.max; z++) {
            let sec = "";
            let allEmpty = true;
            for (let y = state.min; y < state.max; y++) {
                let line = "";
                for (let x = state.min; x < state.max; x++) {
                    let a = get4(state, x, y, z, w);
                    line += a ? "#" : ".";
                    if (a) {
                        allEmpty = false;
                    }
                }
                sec += line + "\n";
            }
            if (allEmpty) {
                // console.log("(empty)");
            } else {
                console.log("z=" + z + ", w=" + w);
                console.log(sec);
                console.log("");
            }
        }
    }
}

function parse3(input) {
    const lines = util.getLines(input);
    let xSize = lines[0].length;

    let size = Math.ceil(xSize)
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
                set3(state, x - mid, y - mid, z - mid, false);
            }
            if (typeof lines[y] !== "undefined") {
                set3(state, x - mid, y - mid, 0, lines[y][x] === "#");
            }
        }
    }
    return state;
}

function parse4(input) {
    const lines = util.getLines(input);

    let size = Math.ceil(lines.length);
    let mid = Math.ceil(size / 2);

    let data = {};
    let state = {
        data: data,
        min: -mid,
        max: mid
    };
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            for (let w = 0; w < size; w++) {
                for (let z = 0; z < size; z++) {
                    set4(state, x - mid, y - mid, z - mid, w - mid, false);
                }
            }
            if (typeof lines[y] !== "undefined") {
                set4(state, x - mid, y - mid, 0, 0, lines[y][x] === "#");
            }
        }
    }
    return state;
}

function countNeighbours3(state, x, y, z) {
    let active = 0;
    let inactive = 0;
    for (let zs = -1; zs <= 1; zs++) {
        for (let xs = -1; xs <= 1; xs++) {
            for (let ys = -1; ys <= 1; ys++) {
                if (zs === 0 && xs === 0 && ys === 0) continue;
                if (get3(state, x + xs, y + ys, z + zs) === true) {
                    active++;
                } else {
                    inactive++;
                }
            }
        }
    }
    return {active, inactive};
}

function countNeighbours4(state, x, y, z, w) {
    let active = 0;
    let inactive = 0;
    for (let ws = -1; ws <= 1; ws++) {
        for (let zs = -1; zs <= 1; zs++) {
            for (let xs = -1; xs <= 1; xs++) {
                for (let ys = -1; ys <= 1; ys++) {
                    if (zs === 0 && xs === 0 && ys === 0 && ws === 0) continue;
                    if (get4(state, x + xs, y + ys, z + zs, w + ws) === true) {
                        active++;
                    } else {
                        inactive++;
                    }
                }
            }
        }
    }
    return {active, inactive};
}

function count3(state) {
    let active = 0;
    let inactive = 0;
    for (let z = state.min; z < state.max; z++) {
        for (let y = state.min; y < state.max; y++) {
            for (let x = state.min; x < state.max; x++) {
                if (get3(state, x, y, z) === true) {
                    active++;
                } else {
                    inactive++;
                }
            }
        }
    }
    return {active, inactive};
}

function count4(state) {
    let active = 0;
    let inactive = 0;
    for (let w = state.min; w < state.max; w++) {
        for (let z = state.min; z < state.max; z++) {
            for (let y = state.min; y < state.max; y++) {
                for (let x = state.min; x < state.max; x++) {
                    if (get4(state, x, y, z, w) === true) {
                        active++;
                    } else {
                        inactive++;
                    }
                }
            }
        }
    }
    return {active, inactive};
}

function set3(state, x, y, z, v) {
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

function get3(state, x, y, z) {
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


function set4(state, x, y, z, w, v) {
    let absw = Math.abs(w);
    if (absw >= state.max || -absw <= state.min) {
        state.max = absw;
        state.min = -absw - 1;
    }

    let wd = state.data[w];
    if (!wd) {
        wd = {};
    }
    let zd = wd[z];
    if (!zd) {
        zd = {};
    }
    let yd = zd[y];
    if (!yd) {
        yd = {};
    }
    yd[x] = v;
    zd[y] = yd;
    wd[z] = zd;
    state.data[w] = wd;
}

function get4(state, x, y, z, w) {
    let absw = Math.abs(w);
    if (absw >= state.max || -absw <= state.min) {
        state.max = absw;
        state.min = -absw - 1;
    }

    let wd = state.data[w];
    if (!wd) {
        return undefined;
    }
    let zd = wd[z];
    if (!zd) {
        return undefined;
    }
    let yd = zd[y];
    if (!yd) {
        return undefined;
    }
    return yd[x];
}

module.exports = {part1, part2}
