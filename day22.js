// --- Day 22: Allergen Assessment ---
// Full description: https://adventofcode.com/2020/day/22

import { getInput } from "./getInput.js";

(async () => {
  const startingDecks = await getInput(22, true);
  let [player1Deck, player2Deck] = startingDecks;
  player1Deck = player1Deck
    .split("\n")
    .filter(item => item && item !== "Player 1:")
    .map(Number);
  player2Deck = player2Deck
    .split("\n")
    .filter(item => item && item !== "Player 2:")
    .map(Number);

  const playRound = (player1Deck, player2Deck) => {
    const player1Card = player1Deck.shift();
    const player2Card = player2Deck.shift();
    player1Card > player2Card
      ? player1Deck.push(player1Card, player2Card)
      : player2Deck.push(player2Card, player1Card);
  };

  const calcScore = winningPlayerDeck =>
    winningPlayerDeck.reverse().reduce((acc, item) => {
      const index = winningPlayerDeck.indexOf(item) + 1;
      return acc + item * index;
    }, 0);

  do {
    playRound(player1Deck, player2Deck);
  } while (player1Deck.length > 0 && player2Deck.length > 0);

  const winningPlayerDeck = !!player1Deck.length ? player1Deck : player2Deck;

  console.log("Part 1: ", calcScore(winningPlayerDeck));

  const playRecursiveCombat = (player1Deck, player2Deck) => {
    const player1Rounds = new Set(),
      player2Rounds = new Set();

    while (player1Deck.length > 0 && player2Deck.length > 0) {
      const player1Round = player1Deck.join(",");
      const player2Round = player2Deck.join(",");

      if (player1Rounds.has(player1Round) || player2Rounds.has(player2Round))
        return [calcScore(player1Deck), 1];

      const player1Card = player1Deck.shift();
      const player2Card = player2Deck.shift();

      if (
        player1Card <= player1Deck.length &&
        player2Card <= player2Deck.length
      ) {
        const [, winner] = playRecursiveCombat(
          player1Deck.slice(0, player1Card),
          player2Deck.slice(0, player2Card)
        );
        winner === 1
          ? player1Deck.push(player1Card, player2Card)
          : player2Deck.push(player2Card, player1Card);
      } else {
        if (player1Card > player2Card)
          player1Deck.push(player1Card, player2Card);
        else player2Deck.push(player2Card, player1Card);
      }

      player1Rounds.add(player1Round);
      player2Rounds.add(player2Round);
    }

    const winningPlayerDeck =
      player1Deck.length > 0 ? player1Deck : player2Deck;
    const score = calcScore(winningPlayerDeck);

    return [score, player1Deck.length > 0 ? 1 : 2];
  };

  console.log("Part 2: ", playRecursiveCombat(player1Deck, player2Deck)[0]);
})();
