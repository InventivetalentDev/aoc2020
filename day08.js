'use strict'

const util = require("./util");

const ONLY_RUN_ONCE = (instr, memory) => {
    if (instr.runCount > 0) {
        return false;
    }
    return true;
};

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input);
    const instructions = lines.map(parseInstruction);
    let out = run(instructions, ONLY_RUN_ONCE);
    console.log(out)
    return out.memory.accumulator;
}

// Part 2
// ======

const part2 = input => {
    const lines = util.getLines(input);
    const instructions = lines.map(parseInstruction);
    for (let i = 0; i < instructions.length; i++) {
        let newInstructions = JSON.parse(JSON.stringify(instructions));
        let toModify = newInstructions[i];
        if (toModify.operation === "acc") continue;
        if (toModify.operation === "nop") {
            toModify.operation = "jmp";
        } else if (toModify.operation === "jmp") {
            toModify.operation = "nop";
        }

        let out = run(newInstructions, ONLY_RUN_ONCE);
        if (out.memory.pointer >= instructions.length) {
            console.log(out);
            return out.memory.accumulator;
        }
    }
    return -1;
}

function run(instructions,
             callPredicate = (instruction, memory) => true,
             initialMemory = {pointer: 0, accumulator: 0}) {
    const memory = initialMemory;
    while (memory.pointer < instructions.length) {
        let instr = instructions[memory.pointer];
        if (!callPredicate(instr, memory)) {
            break;
        }
        runInstruction(instr, memory);
    }
    return {instructions, memory};
}

function runInstruction(instr, memory) {
    if (!instr.runCount) {
        instr.runCount = 1;
    } else {
        instr.runCount++;
    }
    switch (instr.operation) {
        case "acc": {
            memory.accumulator += instr.argument;
            memory.pointer++;
            break;
        }
        case "jmp": {
            memory.pointer += instr.argument;
            break;
        }
        case "nop": {
            memory.pointer++;
            break;
        }
        default: {
            memory.pointer++;
            break;
        }
    }
}

function parseInstruction(line) {
    let split = line.split(" ");
    let operation = split[0];
    let argument = parseInt(split[1]);
    return {operation, argument};
}

module.exports = {part1, part2, run}
