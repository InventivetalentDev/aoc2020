'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    const entries = util.getEmptyLineSeparatedEntries(input, "\n");
    let sum = 0;
    for (let entry of entries) {
        // group
        let lines = util.getLines(entry);
        let answeredYes = [];
        for (let line of lines) {
            // person
            if (line.length < 1) continue;
            for (let ch of line) {
                if (!answeredYes.includes(ch)) {
                    answeredYes.push(ch);
                }
            }
        }
        sum += answeredYes.length;
    }
    return sum;
}

// Part 2
// ======

const part2 = input => {
    const entries = util.getEmptyLineSeparatedEntries(input, "\n");
    let sum = 0;
    for (let entry of entries) {
        console.log(entry)
        // group
        let lines = util.getLines(entry);
        let peopleInGroup = 0;
        let answeredYes = {};
        for (let line of lines) {
            // person
            if (line.length < 1) continue;
            for (let ch of line) {
                if (!answeredYes.hasOwnProperty(ch)) {
                    answeredYes[ch] = 1;
                } else {
                    answeredYes[ch]++;
                }
            }
            peopleInGroup++; // count here to ignore empty lines
        }
        for (let question in answeredYes) {
            let count = answeredYes[question];
            if (count === peopleInGroup) {
                sum++;
            }
        }
    }
    return sum;
}

module.exports = {part1, part2}
