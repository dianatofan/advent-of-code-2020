// --- Day 3: Toboggan Trajectory ---
// Full description: https://adventofcode.com/2020/day/3

import { getInput } from "./getInput.js";

const getNumberOfTreesEncountered = async (right, down) => {
  let inputData = await getInput(3);
  inputData = inputData.map(item => item.split(""));
  const width = inputData[0].length;
  const height = inputData.length;
  let pos;
  let i = 0;
  let j = 0;
  let count = 0;
  do {
    pos = inputData[j][i % width];
    pos === "#" && count++;
    i += right;
    j += down;
  } while (j < height);
  return count;
};

// Part 1: find out how many you'd encounter following a slope of right 3 and down 1
(async () => {
  const count = await getNumberOfTreesEncountered(3, 1);
  console.log(count);
})();

// Part 2: multiply numberr of trees on multiple slopes
(async () => {
  const slopes = [
    {
      right: 1,
      down: 1
    },
    {
      right: 3,
      down: 1
    },
    {
      right: 5,
      down: 1
    },
    {
      right: 7,
      down: 1
    },
    {
      right: 1,
      down: 2
    }
  ];
  let product = 1;
  const getTrees = async () =>
    Promise.all(
      slopes.map(slope => getNumberOfTreesEncountered(slope.right, slope.down))
    );
  getTrees().then(data => {
    data.forEach(item => (product *= item));
    console.log(product);
  });
})();
