'use strict'

const util = require("./util");

// https://github.com/robjohnstone2/aoc2020/blob/main/day23/index.js

// Part 1
// ======

const part1 = input => {
    const nums = parse(input);
    const circle = makeCircle(nums);
    const min = Math.min.apply(Math, nums);
    const max = Math.max.apply(Math, nums);
    printCircle(circle);
    console.log(" ");

    let curr = circle;
    for (let i = 0; i < 10; i++) {
        console.log("-- move " + (i + 1) + " --");
        console.log("cups: ... " + curr.prev.v + " (" + curr.v + ") " + curr.next.v + " ...");
        const pick = [curr.next.v, curr.next.next.v, curr.next.next.next.v];
        console.log("pick: " + pick);
        let destV = curr.v - 1;
        while (pick.includes(destV)) {
            destV--;
            if (destV < min) {
                destV = max;
            }
        }
        console.log("dest: " + destV);
    }
}

// Part 2
// ======

const part2 = input => {
    return input
}

function get(circle, pos) {

}

function printCircle(circle) {
    const startI = circle.i;
    let curr = circle;
    while (true) {
        console.log(curr.v);
        curr = curr.next;
        if (curr.i === startI) {
            break;
        }
    }
}

function makeCircle(nums) {
    const head = node(nums[0]);
    let curr = head;
    for (let i = 1; i < nums.length; i++) {
        curr.next = node(nums[i]);
        curr.next.i = i;
        curr = curr.next;
        curr.prev = curr;
    }
    curr.next = head;
    head.prev = curr;
    return head;
}

function node(num) {
    return {
        v: num,
        i: 0,
        next: null,
        prev: null
    };
}

function parse(input) {
    return input.split("").map(util.mapParseInt);
}

module.exports = {part1, part2}
