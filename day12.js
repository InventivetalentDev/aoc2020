'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input);
    let endState = run(lines);
    return Math.abs(endState.n) + Math.abs(endState.e);
}

// Part 2
// ======

const part2 = input => {
    return input
}

const directions = ["N", "E", "S", "W"];

function run(lines) {
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
                applyDirectionMove(parsed, state);
                break;
            case "F":
                applyForwardMove(parsed, state);
                break;
            case "R":
            case "L":
                applyRotation(parsed, state);
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

function applyRotation(line, state) {
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

function applyDirectionMove(line, state) {
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

function applyForwardMove(line, state) {
    if (line.action === "F") {
        applyDirectionMove({
            action: state.facing,
            value: line.value
        }, state);
    }
}

function parse(line) {
    let action = line.substr(0, 1);
    let value = parseInt(line.substr(1));
    return {action, value};
}

module.exports = {part1, part2}
