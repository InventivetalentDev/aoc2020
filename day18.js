'use strict'

const util = require("./util");

const PARENTHESES_EXTRACT = /\([0-9+* ]+\)/;
const PARTS_EXTRACT = /([0-9+*]+)/g;

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input);
    let sum = 0;
    for (let line of lines) {
        sum += evaluate(line);
    }
    return sum;
}

// Part 2
// ======

const part2 = input => {
    return input
}

function evaluate(line) {
    // console.log("eval(" + line + ")")
    if (!line.includes("\(") && !line.includes("\)")) {
        let parts = line.match(PARTS_EXTRACT);
        return accumulate(parts);
    } else {
        let res = PARENTHESES_EXTRACT.exec(line);
        let expr = res[0];
        let result = evaluate(expr.replace("\(", "").replace("\)", ""));
        line = line.replace(expr, result);
        return evaluate(line);
    }
}

function accumulate(parts) {
    // console.log("acc(" + parts + ")")
    let acc = 0;
    let op = '+';
    for (let part of parts) {
        if (isNaN(part)) {
            op = part.trim();
            continue;
        }
        let num = parseInt(part.trim());
        switch (op) {
            case '+':
                acc += num;
                break;
            case '*':
                acc *= num;
                break;
        }
    }
    return acc;
}

module.exports = {part1, part2}
