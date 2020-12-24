'use strict'

const util = require("./util");

// cube coordinates from https://www.redblobgames.com/grids/hexagons/
const dirMap = {
    // x,y,z
    "e": [+1, -1, 0],
    "se": [0, -1, +1],
    "sw": [-1, 0, +1],
    "w": [-1, +1, 0],
    "nw": [0, +1, -1],
    "ne": [+1, 0, -1]
};

// Part 1
// ======

const part1 = input => {
    const directions = util.getLines(input).map(parseLine);
    const data = parseInitialState(directions);
    console.log(JSON.stringify(data, null, 2));
    return countBlack(data);
}

// Part 2
// not working :shrug: https://github.com/AidarT/aoc2020/blob/main/aoc2020day24.js
// ======

const part2 = input => {
    const directions = util.getLines(input).map(parseLine);
    let data = parseInitialState(directions);
    console.log(JSON.stringify(data, null, 2));
    for (let i = 0; i <= 100; i++) {
        let dataCopy = JSON.parse(JSON.stringify(data));
        for (let x in data) {
            for (let y in data[x]) {
                for (let z in data[x][y]) {
                    let obj = JSON.parse(JSON.stringify(get3(data, +x, +y, +z) || {}));
                    console.log(obj)
                    let adjacentBlack = countAdjacentBlack(data, +x, +y, +z);
                    console.log(adjacentBlack)
                    if (obj && obj.black === true) {
                        if (adjacentBlack === 0 || adjacentBlack > 2) {
                            obj.black = false;
                            obj.flips++;
                        }
                    } else {
                        if (adjacentBlack === 2) {
                            obj.black = true;
                            obj.flips++;
                        }
                    }
                    console.log(obj)
                    set3(dataCopy, +x, +y, +z, obj);
                }
            }
        }
        data = JSON.parse(JSON.stringify(dataCopy));
        console.log(i + " " + countBlack(data));
    }
    return countBlack(data);
}

function parseInitialState(directions) {
    const data = {};
    for (let dir of directions) {
        let pos = [0, 0, 0];
        for (let step of dir) {
            let ch = dirMap[step];
            pos[0] += ch[0];
            pos[1] += ch[1];
            pos[2] += ch[2];
        }
        let d = get3(data, pos[0], pos[1], pos[2]);
        if (!d) {
            d = {
                black: true,
                flips: 1
            };
        } else {
            d.black = !d.black;
            d.flips++;
        }
        set3(data, pos[0], pos[1], pos[2], d);
    }
    return data;
}

function countAdjacentBlack(data, x, y, z) {
    let c = 0;
    for (let d of Object.values(dirMap)) {
        let g = get3(data, x + d[0], y + d[1], z + d[2]);
        if (g && g.black) {
            c++;
        }
    }
    return c;
}

function countBlack(data) {
    let blackTiles = 0;
    for (let x in data) {
        for (let y in data[x]) {
            for (let z in data[x][y]) {
                let obj = get3(data, +x, +y, +z);
                if (obj) {
                    if (obj.black) blackTiles++;
                }
            }
        }
    }
    return blackTiles;
}

function set3(data, x, y, z, v) {
    let zd = data[z];
    if (!zd) {
        zd = {};
    }
    let yd = zd[y];
    if (!yd) {
        yd = {};
    }
    yd[x] = v;
    zd[y] = yd;
    data[z] = zd;
}

function get3(data, x, y, z) {
    let zd = data[z];
    if (!zd) {
        return undefined;
    }
    let yd = zd[y];
    if (!yd) {
        return undefined;
    }
    return yd[x];
}


function parseLine(line) {
    return line.match(/(sw|nw|ne|se|e|w)/g);
}

module.exports = {part1, part2}
