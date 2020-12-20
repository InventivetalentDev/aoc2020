'use strict'

const util = require("./util");

const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

// Part 1
// ======

const part1 = input => {
    const parsed = parseTiles(util.getLines(input));
    console.log(parsed);
    let corners = [];
    for (let i = 0; i < parsed.length; i++) {
        let tileA = parsed[i];
        let matchingSides = [];
        for (let sideA = TOP; sideA <= LEFT; sideA++) {
            let edgeA = getEdge(tileA, sideA);
            let strA = JSON.stringify(edgeA);
            let matching = [];
            for (let j = 0; j < parsed.length; j++) {
                if (i === j) continue;
                let tileB = parsed[j];

                for (let sideB = TOP; sideB <= LEFT; sideB++) {
                    let edgeB = getEdge(tileB, sideB);

                    if (strA === JSON.stringify(edgeB) || strA === JSON.stringify(JSON.parse(JSON.stringify(edgeB)).reverse())) {
                        matching.push([tileB, sideB]);
                        matchingSides.push([tileB, sideA, sideB]);
                    }
                }
            }
            // console.log(" ");
            // console.log("a side " + sa);
            // printTile(a);
            // for (let m of matching) {
            //     console.log("b side " + m[1]);
            //     printTile(m[0]);
            // }
            // console.log(" ")
        }
        console.log("===========")
        console.log("ID " + tileA.id);
        printTile(tileA);
        console.log("matching sides " + matchingSides.length);
        for (let m of matchingSides) {
            printTile(m[0]);
        }
        if (matchingSides.length === 2) {
            corners.push(tileA);
        }
    }

    console.log("corners")
    let m = 1;
    for (let co of corners) {
        console.log(co);
        m *= co.id;
    }
    return m;
}

// Part 2
// ======

const part2 = input => {
    return input
}

function printTile(tile) {
    console.log("ID: " + tile.id);
    for (let y = 0; y < tile.data.length; y++) {
        console.log(tile.data[y].map(v => v ? "#" : ".").join(" "));
    }
}

function getEdge(tile, which) {
    let edge = [];
    switch (which) {
        case TOP: {
            edge = tile.data[0];
            break;
        }
        case BOTTOM: {
            edge = tile.data[tile.data.length - 1];
            break;
        }
        case LEFT: {
            for (let r of tile.data) {
                edge.push(r[0]);
            }
            break;
        }
        case RIGHT: {
            for (let r of tile.data) {
                edge.push(r[r.length - 1]);
            }
            break;
        }
    }
    return edge;
}

function parseTiles(lines) {
    const tiles = [];
    let current = {};
    let l = 0;
    for (let line of lines) {
        if (line.startsWith("Tile")) {
            line = line.substr("Tile ".length).replace("\:", "");
            current.id = parseInt(line);
            continue;
        }
        if (line.length <= 2) {
            tiles.push(current);
            current = {};
            l = 0;
            continue;
        }

        if (!current.data) {
            current.data = [];
        }
        current.data[l++] = line.split("").map(v => v === "#");
    }
    if (current && current.data) {
        tiles.push(current);
    }
    return tiles;
}

module.exports = {part1, part2}
