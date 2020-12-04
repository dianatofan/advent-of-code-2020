// --- Day 1: Report Repair ---
// Full description: https://adventofcode.com/2020/day/1

import { getInput } from "./getInput.js";

// Part 1: find 2 entries from a list that sum to 2020; what do you get if you multiply them together?
(async () => {
  const list = await getInput(1);
  const numbersList = list.map(item => parseInt(item));
  for (let i = 0; i < numbersList.length; i++) {
    for (let j = 1; j < numbersList.length; j++) {
      if (numbersList[i] + numbersList[j] === 2020) {
        const result = numbersList[i] * numbersList[j];
        console.log(result);
      }
    }
  }
})();

// Part 2: find 3 entries meeting same criteria
(async () => {
  const list = await getInput(1);
  const numbersList = list.map(item => parseInt(item));
  for (let i = 0; i < numbersList.length; i++) {
    for (let j = 1; j < numbersList.length; j++) {
      for (let k = 2; k < numbersList.length; k++) {
        if (numbersList[i] + numbersList[j] + numbersList[k] === 2020) {
          const result = numbersList[i] * numbersList[j] * numbersList[k];
          console.log(result);
        }
      }
    }
  }
})();
