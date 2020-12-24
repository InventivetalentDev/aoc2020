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
    // const data = {};
    // for (let dir of directions) {
    //     let key = dir.join(",");
    //     if (!data.hasOwnProperty(key)) {
    //         data[key] = {
    //             black: true,
    //             flips: 1
    //         };
    //     } else {
    //         let x = data[key];
    //         data[key] = {
    //             black: !x.black,
    //             flips: x.flips + 1
    //         };
    //     }
    // }
    const data = {};
    for (let dir of directions) {
        let pos = [0, 0, 0];
        for (let step of dir) {
            let ch = dirMap[step];
            pos[0] += ch[0];
            pos[1] += ch[1];
            pos[2] += ch[2];
        }
        let x = get3(data, pos[0], pos[1], pos[2]);
        if (!x) {
            x = {
                black: true,
                flips: 1
            };
        } else {
            x.black = !x.black;
            x.flips++;
        }
        set3(data, pos[0], pos[1], pos[2], x);
    }
    console.log(JSON.stringify(data, null, 2));
    let blackTiles = 0;
    for (let x in data) {
        for (let y in data[x]) {
            for (let z in data[x][y]) {
                let obj = data[x][y][z];
                if (obj) {
                    if (obj.black) blackTiles++;
                }
            }
        }
    }
    return blackTiles;
}

// Part 2
// ======

const part2 = input => {
    return input
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
