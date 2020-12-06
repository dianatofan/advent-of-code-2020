// --- Day 5: Binary Boarding ---
// Full description: https://adventofcode.com/2020/day/5

import { getInput } from "./getInput.js";

// Part 1: what is the highest seat ID on a boarding pass?
(async () => {
  const boardingPasses = await getInput(5);
  const seat = "FBFBBFFRLR";
  const seatIDs = boardingPasses.map(seat => {
    let row = 0,
      front = 0,
      back = 128;
    let column = 0,
      left = 0,
      right = 8;
    seat.split("").forEach((letter, i) => {
      if (i <= 6) {
        letter === "F"
          ? (back = back - (back - front) / 2)
          : (front = front + (back - front) / 2);
      }
      if (i === 6) {
        letter === "F" ? (row = front) : (row = back - 1);
      }
      if (i > 6 && i <= 9) {
        letter === "L"
          ? (right = right - (right - left) / 2)
          : (left = left + (right - left) / 2);
      }
      if (i === 9) {
        letter === "L" ? (column = left) : (column = right - 1);
      }
    });
    return row * 8 + column;
  });
  console.log(Math.max(...seatIDs));
  // Part 2: get ID of your seat
  seatIDs
    .sort((a, b) => a - b)
    .forEach((id, i) => {
      if (seatIDs[i + 1] - seatIDs[i] === 2) {
        console.log("mySeatID: ", seatIDs[i] + 1);
      }
    });
})();
