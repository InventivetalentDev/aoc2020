'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input);
    let endState = run1(lines);
    return Math.abs(endState.n) + Math.abs(endState.e);
}

// Part 2
// ======

const part2 = input => {
    const lines = util.getLines(input);
    let endState = run2(lines);
    return Math.abs(endState.sn) + Math.abs(endState.se);
}

const directions = ["N", "E", "S", "W"];

function run1(lines) {
    const state = {
        e: 0,
        n: 0,
        rotation: 1,
        facing: "E"
    };


    // console.log(state);
    // console.log(" ")

    for (let line of lines) {
        let parsed = parse(line);
        switch (parsed.action) {
            case "N":
            case "E":
            case "S":
            case "W":
                applyShipDirectionMove(parsed, state);
                break;
            case "F":
                applyShipForwardMove(parsed, state);
                break;
            case "R":
            case "L":
                applyShipRotation(parsed, state);
                break;
            default:
                console.warn("unknown action: " + parsed);
                break;
        }
        // console.log(state);
    }
    console.log(" ")
    console.log(state);
    return state;
}

function run2(lines) {
    const state = {
        se: 0,
        sn: 0,
        we: 10,
        wn: 1,
    };


    // console.log(state);
    // console.log(" ")

    for (let line of lines) {
        let parsed = parse(line);
        switch (parsed.action) {
            case "N":
            case "E":
            case "S":
            case "W":
                applyWaypointDirectionMove(parsed, state);
                break;
            case "F":
                applyShipForwardMoveToWaypoint(parsed, state);
                break;
            case "R":
            case "L":
                applyWaypointRotationAroundShip(parsed, state);
                break;
            default:
                console.warn("unknown action: " + parsed);
                break;
        }
        // console.log(line + " " + JSON.stringify(state) + "  nd " + (state.wn - state.sn) + " ed " + (state.we - state.se));
    }
    console.log(" ")
    console.log(state);
    return state;
}

function applyShipRotation(line, state) {
    let v = line.value / 90;
    let currRotation = state.rotation;
    if (line.action === "R") {
        currRotation += v;
    } else if (line.action === "L") {
        currRotation -= v;
    }
    state.rotation = util.mod(currRotation, directions.length);
    state.facing = directions[state.rotation];
}

function applyWaypointRotationAroundShip(line, state) {
    // https://stackoverflow.com/a/2259502

    let s = Math.sin(line.value * Math.PI / 180);
    let c = Math.cos(line.value * Math.PI / 180);

    let we = state.we;
    let wn = state.wn;

    let se = state.se;
    let sn = state.sn;

    we -= se;
    wn -= sn;

    let re;
    let rn;
    // https://stackoverflow.com/a/25196651
    if (line.action === "R") {
        re = we * c + wn * s
        rn = -we * s + wn * c;
    } else if (line.action === "L") {
        re = we * c - wn * s
        rn = we * s + wn * c;
    }

    re += se;
    rn += sn;

    state.we = Math.round(re);
    state.wn = Math.round(rn);
}


function applyShipDirectionMove(line, state) {
    let v = line.value;
    switch (line.action) {
        case "N":
            state.n += v;
            break;
        case "E":
            state.e += v;
            break;
        case "S":
            state.n -= v;
            break;
        case "W":
            state.e -= v;
            break;
    }
}


function applyWaypointDirectionMove(line, state) {
    let v = line.value;
    switch (line.action) {
        case "N":
            state.wn += v;
            break;
        case "E":
            state.we += v;
            break;
        case "S":
            state.wn -= v;
            break;
        case "W":
            state.we -= v;
            break;
    }
}

function applyShipForwardMove(line, state) {
    if (line.action === "F") {
        applyShipDirectionMove({
            action: state.facing,
            value: line.value
        }, state);
    }
}

function applyShipForwardMoveToWaypoint(line, state) {
    if (line.action === "F") {
        for (let i = 0; i < line.value; i++) {
            let on = state.wn - state.sn;
            let oe = state.we - state.se;
            state.sn = state.wn;
            state.se = state.we;
            state.wn = state.sn + on;
            state.we = state.se + oe;
        }
    }
}

function parse(line) {
    let action = line.substr(0, 1);
    let value = parseInt(line.substr(1));
    return {action, value};
}

module.exports = {part1, part2}
