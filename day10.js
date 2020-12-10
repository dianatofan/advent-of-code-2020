// --- Day 10: Adapter Array ---
// Full description: https://adventofcode.com/2020/day/10

import { getInput } from "./getInput.js";

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

  // Part 2: find all possible arrangements of adapters to connect the charging outlet to your device
  const findArrangements = joltageRatings => {
    const arrangements = {};
    const rating = joltageRatings.join`,`;
    if (rating in arrangements) {
      return arrangements[key];
    }

    let result = 1;
    for (let i = 1; i < joltageRatings.length - 1; i++) {
      if (joltageRatings[i + 1] - joltageRatings[i - 1] <= 3) {
        const joltageRatingsCombination = [joltageRatings[i - 1]].concat(
          joltageRatings.slice(i + 1)
        );
        result += findArrangements(joltageRatingsCombination, arrangements);
      }
    }
    arrangements[arrangements] = result;
    return result;
  };

  console.log(findArrangements(joltageRatings));
})();
