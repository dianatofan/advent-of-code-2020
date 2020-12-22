// --- Day 22: Allergen Assessment ---
// Full description: https://adventofcode.com/2020/day/22

import { getInput } from "./getInput.js";

(async () => {
  const startingDecks = await getInput(22, true);
  //   const startingDecks = `Player 1:
  // 9
  // 2
  // 6
  // 3
  // 1

  // Player 2:
  // 5
  // 8
  // 4
  // 7
  // 10`.split("\n\n");
  let [player1Deck, player2Deck] = startingDecks;
  player1Deck = player1Deck
    .split("\n")
    .filter(item => item && item !== "Player 1:")
    .map(Number);
  player2Deck = player2Deck
    .split("\n")
    .filter(item => item && item !== "Player 2:")
    .map(Number);

  let i = 0;
  const playRound = (player1Deck, player2Deck) => {
    const player1Card = player1Deck.shift();
    const player2Card = player2Deck.shift();
    player1Card > player2Card
      ? player1Deck.push(player1Card, player2Card)
      : player2Deck.push(player2Card, player1Card);
  };

  do {
    playRound(player1Deck, player2Deck);
  } while (player1Deck.length > 0 && player2Deck.length > 0);

  const winningPlayerDeck = !!player1Deck.length ? player1Deck : player2Deck;

  const score = winningPlayerDeck.reverse().reduce((acc, item) => {
    const index = winningPlayerDeck.indexOf(item) + 1;
    return acc + item * index;
  }, 0);

  console.log(score);

  console.log(player1Deck, player2Deck);
})();
