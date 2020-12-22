'use strict'

const util = require("./util");

// Part 1
// ======

const part1 = input => {
    const {player1Deck, player2Deck} = parseDecks(input);
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
    const {player1Deck, player2Deck} = parseDecks(input);
    console.log("p1 deck " + player1Deck);
    console.log("p2 deck " + player2Deck);


    let {winner, deck} = play2(player1Deck, player2Deck);

    console.log("winner: " + winner);
    console.log(deck);

    let score = 0;
    for (let i = 0; i < deck.length; i++) {
        score += deck[deck.length - 1 - i] * (i + 1);
    }
    return score;
}

function play2(player1Deck, player2Deck, d = 0) {
    let pad = util.repeat(" ", d);
    let round = 1;
    const previousStates = new Set();
    while (player1Deck.length > 0 && player2Deck.length > 0) {
        let stateKey = player1Deck.join() + "_" + player2Deck.join();
        if (previousStates.has(stateKey)) {
            /* if there was a previous round in this game that had exactly the same cards
             * in the same order in the same players' decks,
             * the game instantly ends in a win for player 1.
             */
            return {winner: 1, deck: player1Deck};
        }
        console.log(pad + "-- Round " + (round++) + " --");
        console.log(pad + "p1 deck " + player1Deck);
        console.log(pad + "p2 deck " + player2Deck);
        const player1Card = player1Deck.shift();
        const player2Card = player2Deck.shift();
        console.log(pad + "p1 plays " + player1Card);
        console.log(pad + "p2 plays " + player2Card);

        if (player1Card <= player1Deck.length && player2Card <= player2Deck.length) {
            let {winner} = play2(player1Deck.slice(0, player1Card), player2Deck.slice(0, player2Card), d + 1);
            if (winner === 1) {
                console.log(pad + "p1 wins the round (due to sub-game)");
                player1Deck.push(player1Card, player2Card);
            } else if (winner === 2) {
                console.log(pad + "p2 wins the round (due to sub-game)");
                player2Deck.push(player2Card, player1Card);
            }
        } else {
            if (player1Card > player2Card) {
                console.log(pad + "p1 wins the round");
                player1Deck.push(player1Card, player2Card);
            } else if (player2Card > player1Card) {
                console.log(pad + "p2 wins the round");
                player2Deck.push(player2Card, player1Card);
            }
        }
        previousStates.add(stateKey);
    }

    console.log(pad + "Results:");
    console.log(pad + "p1 deck " + player1Deck);
    console.log(pad + "p2 deck " + player2Deck);

    if (player1Deck.length === 0) {
        return {
            winner: 2,
            deck: player2Deck
        }
    } else {
        return {
            winner: 1,
            deck: player1Deck
        }
    }
}

function parseDecks(input) {
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
    return {player1Deck, player2Deck};
}

module.exports = {part1, part2}
