'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    const lines = util.getLines(input);
    const player1Deck = [];
    const player2Deck = [];
    let p1done = false;
    for (let line of lines) {
        line = line.trim();
        if (line.startsWith("Player")) {
            continue;
        }
        if (line.length < 1) {
            p1done = true;
            continue;
        }
        if (p1done) {
            player2Deck.push(parseInt(line));
        } else {
            player1Deck.push(parseInt(line));
        }
    }
    console.log("p1 deck " + player1Deck);
    console.log("p2 deck " + player2Deck);

    let round = 1;
    while (player1Deck.length > 0 && player2Deck.length > 0) {
        console.log("-- Round " + (round++) + " --");
        console.log("p1 deck " + player1Deck);
        console.log("p2 deck " + player2Deck);
        const player1Card = player1Deck.shift();
        const player2Card = player2Deck.shift();
        console.log("p1 plays " + player1Card);
        console.log("p2 plays " + player2Card);

        if (player1Card > player2Card) {
            console.log("p1 wins the round");
            player1Deck.push(player1Card, player2Card);
        } else if (player2Card > player1Card) {
            console.log("p2 wins the round");
            player2Deck.push(player2Card, player1Card);
        }
    }

    console.log("Results:");
    console.log("p1 deck " + player1Deck);
    console.log("p2 deck " + player2Deck);

    const winnerDeck = player1Deck.length === 0 ? player2Deck : player1Deck;
    let score = 0;
    for (let i = 0; i < winnerDeck.length; i++) {
        score += winnerDeck[winnerDeck.length - 1 - i] * (i + 1);
    }
    return score;
}

// Part 2
// ======

const part2 = input => {
    return input
}

module.exports = {part1, part2}
