// --- Day 25: Combo Breaker ---
// Full description: https://adventofcode.com/2020/day/25

import { getInput } from "./getInput.js";

(() => {
  const publicKeys = [2084668, 3704642];
  let value = 1,
    loopSize = 0;
  while (!publicKeys.includes(value)) {
    loopSize++;
    value = (value * 7) % 20201227;
  }
  const subject = publicKeys.find(key => key !== value);
  let encryptionKey = 1;
  for (let i = 0; i < loopSize; i++) {
    encryptionKey *= subject;
    encryptionKey %= 20201227;
  }
  console.log("Encription key: ", encryptionKey);
})();
