// --- Day 10: Adapter Array ---
// Full description: https://adventofcode.com/2020/day/10

import { getInput } from "./getInput.js";
import { isPrimitive } from "util";

(async () => {
  let joltageRatings = await getInput(10);
  joltageRatings = joltageRatings
    .filter(r => r)
    .map(i => parseInt(i))
    .sort((a, b) => a - b);
  let test = `16
10
15
5
1
11
7
19
6
12
4`
    .split("\n")
    .map(i => parseInt(i))
    .sort((a, b) => a - b);
  // Part 1: What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?
  const builtInAdapterRating = Math.max(...joltageRatings) + 3;
  const joltDifferences = new Map();
  joltDifferences.set("diffOfOne", 0);
  joltDifferences.set("diffOfThree", 0);

  joltageRatings = [0, ...joltageRatings, builtInAdapterRating];
  joltageRatings.forEach((item, i) => {
    if (i > 0) {
      const diff = joltageRatings[i] - joltageRatings[i - 1];
      const key = `${diff === 1 ? "diffOfOne" : "diffOfThree"}`;
      joltDifferences.set(key, joltDifferences.get(key) + 1);
    }
  });

  console.log(
    joltDifferences.get("diffOfOne") * joltDifferences.get("diffOfThree")
  );
})();
