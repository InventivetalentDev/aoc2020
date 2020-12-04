'use strict'

const util = require("./util");

// Part 1
// ======

const requiredFields = {
    "byr": function (v) {
        let p = parseInt(v);
        return v.length === 4 && p >= 1920 && p <= 2002;
    },
    "iyr": function (v) {
        let p = parseInt(v);
        return v.length === 4 && p >= 2010 && p <= 2020;
    },
    "eyr": function (v) {
        let p = parseInt(v);
        return v.length === 4 && p >= 2020 && p <= 2030
    },
    "hgt": function (v) {
        let unit = v.substr(v.length - 2, 2);
        v = v.replace(unit, "");
        let p = parseInt(v);
        switch (unit) {
            case "cm":
                return p >= 150 && p <= 193;
            case "in":
                return p >= 59 && p <= 76;
            default:
                // no unit
                return false;
        }
    },
    "hcl": function (v) {
        if (!v.startsWith("#")) return false;
        if (v.length !== 7) return false;
        return /#[0-9a-f]{6}/.test(v);
    },
    "ecl": function (v) {
        if (v.length !== 3) return false;
        return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v);
    },
    "pid": function (v) {
        return v.length === 9 && /[0-9]{9}/.test(v);
    }
    // "cid" // giving santa a pass
};

const part1 = input => {
    const entries = util.getEmptyLineSeparatedEntries(input);
    let valid = [];
    for (let entry of entries) {
        let split = entry.split(" ");
        let presentKeys = [];
        for (let field of split) {
            if (field.length <= 3) {
                // Filter out spaces and invalid stuff (all fields need 3 letter key+:)
                continue;
            }
            let kv = field.split(":");
            presentKeys.push(kv[0]);
        }
        if (util.arrayContainsAll(presentKeys, Object.keys(requiredFields))) {
            valid.push(entry);
        }
    }
    return valid.length;
}

// Part 2
// ======

const part2 = input => {
    const entries = util.getEmptyLineSeparatedEntries(input);
    let valid = [];
    for (let entry of entries) {
        let split = entry.split(" ");
        let presentFields = {};
        for (let field of split) {
            if (field.length <= 3) {
                // Filter out spaces and invalid stuff (all fields need 3 letter key+:)
                continue;
            }
            let kv = field.split(":");
            presentFields[kv[0]] = kv[1];
        }
        if (util.arrayContainsAll(Object.keys(presentFields), Object.keys(requiredFields))) {
            let allFieldsValid = true;
            for (let k in presentFields) {
                if (k === "cid") continue;
                let v = util.stripNewLine(presentFields[k]);
                if (!requiredFields[k](v)) {
                    allFieldsValid = false;
                    console.warn(k + " : " + v);
                    break;
                }
            }
            if (allFieldsValid) {
                valid.push(entry);
            }
        }
    }
    return valid.length;
}


module.exports = {part1, part2}
