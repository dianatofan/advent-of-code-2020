// --- Day 9: Encoding Error ---
// Full description: https://adventofcode.com/2020/day/9

import { getInput } from "./getInput.js";

(async () => {
  let data = await getInput(9);
  data = data.map(i => parseInt(i));
  const test = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`
    .split("\n")
    .map(i => parseInt(i));
  // Part 1: find first number which is not the sum of 2 of the 25 numbers before it
  const preambleLength = 25;
  const preamble = data.slice(0, preambleLength);

  const isSumOfPrevElem = (n, preamble) =>
    preamble.some(item => preamble.includes(n - item));

  let foundFirstInvalidNumber = false,
    invalidNumber;

  data.forEach((number, i) => {
    if (i >= preambleLength && !foundFirstInvalidNumber) {
      // check if number is the sum of 2 prev elements
      if (isSumOfPrevElem(parseInt(number), preamble)) {
        preamble.push(number);
        preamble.shift();
      } else {
        console.log("Invalid: ", number);
        invalidNumber = number;
        foundFirstInvalidNumber = true;
      }
    }
  });

  // Part 2: find encryption weakness as sum of smallest and largest numbers in contiguous set
  const findWeakness = invalidNumber => {
    let start = 0,
      end = 0,
      sum = 0,
      slice = [];

    while (sum !== invalidNumber) {
      slice = data.slice(start, end);
      sum = slice.reduce((acc, val) => acc + val, 0);
      if (sum < invalidNumber) end++;
      if (sum > invalidNumber) start++;
    }
    return Math.min(...slice) + Math.max(...slice);
  };

  console.log(findWeakness(invalidNumber));
})();
