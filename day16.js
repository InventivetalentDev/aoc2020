'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    let data = parseInput(input);
    let invalidValues = [];
    for (let ticket of data.other) {
        for (let value of ticket) {
            let matching = findMatchingRules(value, data.rules);
            if (matching.length <= 0) {
                invalidValues.push(value);
            }
        }
    }
    return util.sumArray(invalidValues);
}

// Part 2
// not giving the right answer :(
// ======

const part2 = input => {
    let data = parseInput(input);
    // data.other.push(data.ticket)
    let positionMatches = {};
    for (let rule in data.rules) {
        positionMatches[rule] = {};
    }
    t: for (let ticket of data.other) {
        for (let i = 0; i < ticket.length; i++) {
            let value = ticket[i];
            let matching = findMatchingRules(value, data.rules);
            if (matching.length <= 0) {
                continue t;
            } else {
                for (let match of matching) {
                    if (!positionMatches[match].hasOwnProperty(i)) {
                        positionMatches[match][i] = 1;
                    } else {
                        positionMatches[match][i]++;
                    }
                }
            }
        }
    }
    let sortedMatches = {};
    for (let rule in positionMatches) {
        let matches = positionMatches[rule];
        let sorted = [];
        for (let pos in matches) {
            let count = matches[pos];
            sorted.push([parseInt(pos), count]);
        }
        sorted.sort((a, b) => {
            return b[1] - a[1];
        });
        sortedMatches[rule] = sorted;
    }
    console.log(JSON.stringify(positionMatches))
    console.log(JSON.stringify(sortedMatches));

    let knownPositions = {};
    for (let x = 0; x < 1000; x++) {
        for (let rule in sortedMatches) {
            let matches = sortedMatches[rule];
            if (matches.length === 1 || matches[0][1] > matches[1][1]) { // has a specific position with more matches than any other -> no ambiguities
                knownPositions[rule] = matches[0][0];
                delete sortedMatches[rule];
                break;
            }
        }
        // remove known positions from other possible matches
        for (let rule in sortedMatches) {
            let matches = sortedMatches[rule];
            m: for (let i = 0; i < matches.length; i++) {
                for (let known of Object.values(knownPositions)) {
                    if (matches[i][0] === known) {
                        matches.splice(i, 1);
                        break m;
                    }
                }
            }
        }
    }
    console.log(JSON.stringify(knownPositions));

    let departureMultiply = 1;
    for (let field in knownPositions) {
        let pos = knownPositions[field];
        console.log(field + ": " + data.ticket[pos] + " (" + pos + ")");
        if (field.startsWith("departure")) {
            departureMultiply *= data.ticket[pos];
        }
    }
    return departureMultiply;
}

function findMatchingRules(value, rules) {
    let matching = [];
    for (let rule in rules) {
        let v = rules[rule];
        for (let r of v) {
            if (value >= r.min && value <= r.max) {
                matching.push(rule);
            }
        }
    }
    return matching;
}

function parseInput(input) {
    let lines = util.getLines(input);
    let data = {
        rules: {},
        ticket: [],
        other: []
    };

    let stage = 0;
    for (let line of lines) {
        if (line.startsWith("your ticket")) {
            stage = 1;
            continue;
        }
        if (line.startsWith("nearby tickets")) {
            stage = 2;
            continue;
        }
        if (line.trim().length < 2) {
            continue;
        }
        if (stage === 0) { // rules
            let split = line.split(":");
            let field = split[0].trim();
            let split1 = split[1].split("or");
            let valueRanges = [];
            for (let range of split1) {
                range = range.trim();
                let split2 = range.split("-");
                valueRanges.push({
                    min: parseInt(split2[0].trim()),
                    max: parseInt(split2[1].trim())
                });
            }
            data.rules[field] = valueRanges;
        } else if (stage === 1) { // your ticket
            data.ticket = line.split(",").map(util.mapParseInt);
        } else if (stage === 2) { // nearby tickets
            data.other.push(line.split(",").map(util.mapParseInt));
        }
    }
    return data;
}

module.exports = {part1, part2}
