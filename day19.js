'use strict'

const util = require("./util");

const RULE_REGEX = /([0-9]+): (.*)/
const OR_CHECK = /(.*)\|(.*)/;

// Part 1
// ======

const part1 = inputText => {
    const input = parseInput(inputText);

    const rulesById = {};
    for (let rule of input.rules) {
        const match = rule.match(RULE_REGEX);
        rulesById[match[1].trim()] = match[2].trim().replace(/"/g, "");
    }
    console.log(JSON.stringify(rulesById, null, 2));

    const regex = "^" + makeRegex(rulesById[0], rulesById) + "$";
    console.log(regex);

    let matching = input.input.filter(i => i.match(regex));
    return matching.length;
}

// Part 2
// ======

const part2 = inputText => {
    const input = parseInput(inputText);

    const rulesById = {};
    for (let rule of input.rules) {
        const match = rule.match(RULE_REGEX);
        rulesById[match[1].trim()] = match[2].trim().replace(/"/g, "");
    }
    rulesById[8] = "42 | 42 8";
    rulesById[11] = "42 31 | 42 11 31";
    console.log(JSON.stringify(rulesById, null, 2));

    const regex = "^" + makeRegex(rulesById[0], rulesById) + "$";
    console.log(regex);

    let matching = input.input.filter(i => i.match(regex));
    return matching.length;
}

function parseInput(allLines) {
    const lines = util.getLines(allLines);
    const rules = [];
    const input = [];
    let state = false;
    for (let line of lines) {
        if (line.length <= 2) {
            state = true;
            continue;
        }
        if (!state) {
            rules.push(line);
        } else {
            input.push(line);
        }
    }
    return {
        rules,
        input
    }
}

// based on https://github.com/Lx4/aoc2020/blob/main/day19/1.js
function makeRegex(rule, rulesById, d = 0) {
    if (rule.includes("a") || rule.includes("b")) {
        // found string part
        return rule;
    }
    if (d > 50) {
        return "";
    }
    const orMatch = rule.match(OR_CHECK);
    if (orMatch) {
        // found or
        return "(" + makeRegex(orMatch[1], rulesById, d + 1) + "|" + makeRegex(orMatch[2], rulesById, d + 1) + ")";
    }
    // found single rule
    let parts = rule.trim().split(" ");
    let regex = "";
    for (let part of parts) {
        regex += makeRegex(rulesById[part], rulesById, d + 1);
    }
    return regex;
}

/*
function parseRule(line) {
    const split1 = line.split("\:");
    const id = parseInt(split1[0]);
    if (split1[1].includes("\"")) {
        const str = split1[1].replace(/"/g, "").trim();
        return {
            id,
            str
        };
    } else {
        const or = [];
        const split2 = split1[1].split("\|");
        for (let s2 of split2) {
            const ids = s2.trim().split(" ").map(util.mapParseInt);
            or.push(ids);
        }
        return {
            id,
            or
        }
    }
}

function collectValidMessages(rulesById, messages = []) {

}

function collectValidStrings(ruleId, rulesById) {
    const rule = rulesById[ruleId];
    if (rule.hasOwnProperty("str")) {
        return [rule.str];
    }
    let m = [];
    for (let or of rule.or) {
        console.log(or);
        let m1 = "";
        for (let id of or) {
            collectValidStrings(id, rulesById).forEach(e => m1 += e);
        }
        console.log(m1);
        m.push(m1);
    }
    return m;
}

function matches(ruleId, check, pos, rulesById, d = 0) {
    let pad = util.repeat(" ", d);
    // console.log(pad + "matches(" + ruleId + "," + check + "," + pos + ")")
    const rule = rulesById[ruleId];
    if (rule.hasOwnProperty("str")) {
        if (check[pos] === rule.str) {
            return 1;
        } else {
            return 0;
        }
    }
    let anyMatch = false;
    let matchingPositions = 0;
    for (let or of rule.or) {
        matchingPositions = 0;
        let p = pos;
        for (let i = 0; i < or.length; i++) {
            let id = or[i];
            let m = matches(id, check, p, rulesById, d + 1);
            if (m > 0) {
                // console.log(pad + "  " + check.substr(pos) + " matches " + or)
                matchingPositions++;
                p += m;
            }
            p += i;

        }
        // console.log(pad + " matching positions (" + check + ", [" + or + "], " + pos + "): " + matchingPositions + " " + p)
        if (matchingPositions === or.length) {
            anyMatch = true;
        }
    }
    if (anyMatch) {
        return matchingPositions;
    }

    return 0;
}
 */

module.exports = {part1, part2}
