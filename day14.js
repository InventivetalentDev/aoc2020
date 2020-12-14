'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input);
    let data = run(lines);
    return util.sumArray(data.mem);
}

// Part 2
// ======

const part2 = input => {
    return input
}

function run(lines) {
    const data = {
        mask: "",
        mem: []
    };

    for (let line of lines) {
        if (line.startsWith("mask")) {
            data.mask = parseMask(line);
        } else if (line.startsWith("mem")) {
            let parsed = parseMem(line);
            data.mem[parsed.addr] = applyMask(parsed.val, data.mask);
        }
        // console.log(data);
    }

    console.log(data);
    return data;
}

function applyMask(value, mask) {
    let maskBinary = mask.split("");
    let valueBinary = padStart(Number(value).toString(2), maskBinary.length).split("");
    let resultBinary = valueBinary;
    for (let i = 0; i < valueBinary.length; i++) {
        let m = maskBinary[maskBinary.length - 1 - i];
        if (m === "X") continue; // do nothing
        resultBinary[resultBinary.length - 1 - i] = m; // replace with mask
    }
    return parseInt(resultBinary.join(""), 2);
}

function padStart(str, len = 36) {
    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}

function parseMask(line) {
    let split = line.split("\=");
    return split[1].trim();
}

function parseMem(line) {
    let split = line.split("\=");
    let val = parseInt(split[1]);
    let addr = parseInt(split[0].replace("mem\[", "").replace("\]", "").trim());
    return {addr, val};
}

module.exports = {part1, part2}
