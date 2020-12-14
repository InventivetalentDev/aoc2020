'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input);

    const data = {
        mask: "",
        mem: []
    };

    for (let line of lines) {
        if (line.startsWith("mask")) {
            data.mask = parseMask(line);
        } else if (line.startsWith("mem")) {
            let mem = parseMem(line);
            data.mem[mem.addr] = applyMask(mem.val, data.mask);
        }
        // console.log(data);
    }

    console.log(data);

    return util.sumArray(data.mem);
}

// Part 2
// ======

const part2 = input => {
    const lines = util.getLines(input);

    const data = {
        mask: "",
        mem: []
    };


    for (let line of lines) {
        if (line.startsWith("mask")) {
            data.mask = parseMask(line);
        } else if (line.startsWith("mem")) {
            let mem = parseMem(line);
            let addresses = applyAddressDecoder(mem, data.mask);
            for (let addr of addresses) {
                data.mem[parseInt(addr, 2)] = mem.val;
            }
        }
    }

    console.log(data);
    console.log(typeof data.mem);
    console.log(Array.isArray(data.mem));

    // if the array gets to large, it ends up being an object
    return util.sumArray(Object.values(data.mem));
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

function applyAddressDecoder(mem, mask) {
    let maskBinary = mask.split("");
    let addrBinary = padStart(BigInt(mem.addr).toString(2), maskBinary.length).split("");
    for (let i = 0; i < addrBinary.length; i++) {
        // simple part first
        let m = maskBinary[maskBinary.length - 1 - i];
        if (m === "0") continue; // do nothing
        if (m === "1") {
            addrBinary[addrBinary.length - 1 - i] = "1";
        }
    }
    let addresses = [];
    applyAddressDecoder0(addrBinary, maskBinary, addresses)
    return addresses;
}

function applyAddressDecoder0(addrBinary, maskBinary, addresses) {
    for (let i = 0; i < addrBinary.length; i++) {
        for (let a = 0; a < 2; a++) {
            let m = maskBinary[maskBinary.length - 1 - i];
            if (m === "X") {
                let addrCopy = addrBinary.slice(0, addrBinary.length);
                addrCopy[addrCopy.length - 1 - i] = "" + a;
                let ad = addrCopy.join("");
                if (!addresses.includes(ad)) {
                    addresses.push(ad);
                    applyAddressDecoder0(addrCopy, maskBinary, addresses)
                }
            }
        }
    }
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
