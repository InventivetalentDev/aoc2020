'use strict'

const util = require("./util");

// Part 1
// ======

/*
 * The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid.
 * For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.
 */
const part1 = input => {
    const lines = util.getLines(input);
    let valid = [];
    for (let line of lines) {
        let parsed = parse(line);
        let c = 0;
        for (let letter of parsed.password) {
            if (letter === parsed.letter) {
                c++;
            }
        }
        if (c >= parsed.min && c <= parsed.max) {
            valid.push(parsed.password);
        }
    }
    console.log(valid);
    return valid.length;
}

// Part 2
// ======

/*
 * Exactly one of these positions must contain the given letter.
 */
const part2 = input => {
    const lines = util.getLines(input);
    let valid = [];
    for (let line of lines) {
        let parsed = parse(line);
        // -1 = 'Toboggan Corporate Policies have no concept of "index zero"' -> substr(1) returns the second char, so make it substr(0) for char #1
        let a = parsed.password.substr(parsed.min - 1, 1);
        let b = parsed.password.substr(parsed.max - 1, 1);
        if (a !== b) {
            if (a === parsed.letter || b === parsed.letter) {
                valid.push(parsed.password);
            }
        }
    }
    console.log(valid);
    return valid.length;
}

function parse(line) {
    let splitPolicyPassword = line.split(": ");
    let password = splitPolicyPassword[1];
    let splitNumLetter = splitPolicyPassword[0].split(" ");
    let letter = splitNumLetter[1];
    let splitMinMax = splitNumLetter[0].split("-");
    let min = parseInt(splitMinMax[0]);
    let max = parseInt(splitMinMax[1]);

    return {min, max, letter, password}
}

module.exports = {part1, part2, parse}
