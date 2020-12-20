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
// unfinished (https://github.com/dbathon/adventofcode-2020)
// ======

const part2 = input => {
    const parsed = parseTiles(util.getLines(input));
    console.log(parsed);
    let size = Math.floor(Math.sqrt(parsed.length));
    let corners = {};
    let edges = {};
    let center = {};
    let all = {};
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
        let d = {
            tile: tileA,
            sides: matchingSides
        };
        all[tileA.id] = d;
        if (matchingSides.length === 2) {
            corners[tileA.id] = d
        } else if (matchingSides.length === 3) {
            edges[tileA.id] = d
        } else {
            center[tileA.id] = d
        }
    }

    console.log(" ")
    console.log("corners");
    for (let c in corners) {
        console.log(c);
    }
    console.log("edges");
    for (let e in edges) {
        console.log(e);
    }
    console.log("centers");
    for (let c in center) {
        console.log(c);
    }
    console.log(" ")

    // start from a corner and build from there
    let firstCorner = corners[Object.keys(corners)[0]];
    let line = [];
    let f0 = followEdgeToCorner(firstCorner.tile, corners, edges, all, 0);
    let f1 = followEdgeToCorner(firstCorner.tile, corners, edges, all, 1);

    console.log("edge 0")
    console.log(f0)
    for (let e of f0.followed) {
        console.log(e.id);
    }
    console.log("edge 1")
    console.log(f1)
    for (let e of f1.followed) {
        console.log(e.id);
    }

    let lastCornerId = -1;
    for (let c in corners) {
        if (c == firstCorner.tile.id) continue;
        if (c == f0.curr.id) continue;
        if (c == f1.curr.id) continue;
        lastCornerId = c;
    }

    let f2 = followEdgeToCorner(corners[lastCornerId].tile, corners, edges, all, 0);
    let f3 = followEdgeToCorner(corners[lastCornerId].tile, corners, edges, all, 1);
    console.log("edge 2")
    // console.log(f0)
    for (let e of f2.followed) {
        console.log(e.id);
    }
    console.log("edge 3")
    // console.log(f1)
    for (let e of f3.followed) {
        console.log(e.id);
    }
}

function followEdgeToCorner(curr, knownCorners, knownEdges, all, dir, last = null, followedEdge = [], step = 0) {
    console.log(curr.id + " " + (!last ? "n" : last.id))
    // if (last !== null && curr.id === last.id) {
    //     // don't go back
    //     return false;
    // }
    for (let e of followedEdge) {
        if (curr.id === e.id) {
            // don't go back
            console.log("don't go back")
            return false;
        }
    }
    let isEdge = knownEdges.hasOwnProperty(curr.id);
    let isCorner = knownCorners.hasOwnProperty(curr.id);
    if (!isEdge && !isCorner) {
        // not an edge / corner
        console.log("not an edge/corner")
        return false;
    }
    followedEdge.push(curr);
    if (step > 0 && knownCorners.hasOwnProperty(curr.id)) {
        // found next corner
        return {
            curr: curr,
            step: step,
            last: last,
            followed: followedEdge
        };
    }
    for (let i = dir; i < 3; i++) {
        let next = all[curr.id].sides[i][0];
        console.log("next " + next.id)
        let r = followEdgeToCorner(next, knownCorners, knownEdges, all, i, curr, followedEdge, step + 1);
        console.log(i + " " + r)
        if (r !== false) {
            return r;
        }
    }
    console.log("nothing found")
    return false;
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
