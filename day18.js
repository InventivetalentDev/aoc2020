'use strict'

const util = require("./util");

const PARENTHESES_EXTRACT = /\([0-9+* ]+\)/;
const PARTS_EXTRACT = /([0-9+*]+)/g;
const ADD_EXTRACT = /([0-9]+ ?\+ ?[0-9]+)/g;
const MULT_EXTRACT = /([0-9]+ ?\* ?[0-9]+)/g;

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input);
    let sum = 0;
    for (let line of lines) {
        sum += evaluate(line, accumulateLeftToRight);
        console.log(" ")
    }
    return sum;
}

// Part 2
// My input is cursed. Running with my input is off by 11700,
// running the input of https://github.com/Thiesjoo/aoc2020/blob/main/18/index.js#L55 is right on (╯°□°）╯︵ ┻━┻
// ======

const part2 = input => {
    const lines = util.getLines(input);
    let sum = 0;
    for (let line of lines) {
        sum += evaluate(line, accumulateAdditionFirst);
    }
    return sum;
}

function evaluate(line, accumulate) {
    // console.log("eval(" + line + ")")
    if (!line.includes("\(") && !line.includes("\)")) {
        let parts = line.match(PARTS_EXTRACT);
        return accumulate(parts, line);
    } else {
        let res = PARENTHESES_EXTRACT.exec(line);
        let expr = res[0];
        let result = evaluate(expr.replace("\(", "").replace("\)", ""), accumulate);
        line = line.replace(expr, result);
        return evaluate(line, accumulate);
    }
}

function accumulateLeftToRight(parts) {
    console.log("accLTR(" + parts + ")")
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


function accumulateAdditionFirst(prts, line) {
    console.log("accAF(" + line + ")");
    if (line.includes("\+")) {
        let adds = line.match(ADD_EXTRACT);
        console.log(adds);
        if (adds && adds.length > 0) {
            for (let add of adds) {
                let parts = add.match(PARTS_EXTRACT);
                let res = parseInt(parts[0]) + parseInt(parts[2]);
                line = line.replace(add, res);
            }
        }
        return accumulateAdditionFirst(prts, line);
    }

    return accumulateLeftToRight(line.match(PARTS_EXTRACT));

    // let mults = line.match(MULT_EXTRACT);
    // if (mults && mults.length > 0) {
    //     for (let mult of mults) {
    //         let parts = mult.match(PARTS_EXTRACT);
    //         let res = parseInt(parts[0]) * parseInt(parts[2]);
    //         line = line.replace(mult, res);
    //     }
    // }
    // if (line.includes("\*")) {
    //     return accumulateAdditionFirst(prts, line);
    // }
    //
    // return parseInt(line);


    // console.log("accAF(" + parts + ")")
    // let acc = 0;
    // let op = '+';
    // let i = 1;
    // while (i < parts.length) {
    //     console.log("+")
    //     console.log(parts);
    //     if(parts[i]) {
    //         op = parts[i];
    //         if (op === "+") {
    //             let a = parseInt(searchBefore(parts,i-1));
    //             let b = parseInt(searchAfter(parts,i+1));
    //             let res = a + b;
    //             // acc += res;
    //             parts[i-1] = undefined;
    //             parts[i] = undefined;
    //             parts[i+1] = undefined;
    //             // partsCopy.splice(i - 1, 2);
    //             parts[i]=res;
    //         }
    //     }
    //     i += 2;
    // }
    // parts = parts.filter(el=>el!==undefined);
    // i=1;
    // while (i < parts.length) {
    //     console.log("*")
    //     console.log(parts);
    //     if(parts[i]) {
    //         op = parts[i];
    //         if (op === "*") {
    //             let a = parseInt(searchBefore(parts,i-1));
    //             let b = parseInt(searchAfter(parts,i+1));
    //             acc += a * b;
    //             parts[i-1] = undefined;
    //             parts[i] = undefined;
    //             parts[i+1] = undefined;
    //         }
    //     }
    //     i += 2;
    // }
    // return acc;
}

module.exports = {part1, part2}
