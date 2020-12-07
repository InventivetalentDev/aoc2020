'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input);
    let parsed = lines.map(parse);
    let tree = buildTree(parsed);
    let count = 0;
    for (let subtree of tree.c) {
        if (treeContains(subtree, "shiny gold")) {
            count++;
        }
    }
    return count;
}

// Part 2
// ======

const part2 = input => {
    const lines = util.getLines(input);
    let parsed = lines.map(parse);
    let tree = buildTree(parsed);
    return countChildrenAfter(tree, "shiny gold");
}

function countChildrenAfter(tree, after) {
    let count = 0;
    for (let subtree of tree.c) {
        if (subtree.r === after) {
            count += countAllChildrenByAmount(subtree)
        }
    }
    return count;
}

function countAllChildrenByAmount(tree) {
    let count = 0;
    for (let subtree of tree.c) {
        count += subtree.n;
        count += countAllChildrenByAmount(subtree) * subtree.n;
    }
    return count;
}

function treeContains(tree, search) {
    for (let subtree of tree.c) {
        if (subtree.r === search) return true;
        if (treeContains(subtree, search)) {
            return true;
        }
    }
    return false;
}

function buildTree(parsed) {
    let parsedByContaining = {};
    for (let par of parsed) {
        parsedByContaining[par.containingBag] = par;
    }
    let subtrees = {};
    let tree = [];

    for (let par of parsed) {
        tree.push(buildSubTree(parsedByContaining, {t: par.containingBag, c: 1}, subtrees));
    }


    return {
        r: "_",
        n: 1,
        c: tree
    };
}

function buildSubTree(parsedByContaining, root, subtrees) {
    let t = {
        r: root.t,
        n: root.c,
        c: []
    };
    for (let c of parsedByContaining[root.t].containedBags) {
        let st = buildSubTree(parsedByContaining, c, subtrees);
        t.c.push(Object.assign({}, st));
    }
    t = JSON.parse(JSON.stringify(t));
    subtrees[root.t] = t;
    return t;
}

function parse(line) {
    line = line.replace(".", '');
    let split = line.split(" bags contain ");
    let containingBag = split[0].trim();
    let containedBags = [];
    if (!line.endsWith("no other bags")) {
        let split2 = split[1].split(",");
        split2.forEach(e => {
            e = e
                .replace(/bags?/, '')
                .trim();
            let split3 = e.split(" ");
            containedBags.push({t: e.replace(/[0-9]/, '').trim(), c: parseInt(split3[0])});
        })
    }
    return {containingBag, containedBags};
}

module.exports = {part1, part2}
