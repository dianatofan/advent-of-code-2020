//--- Day 15: Rambunctious Recitation ---
// Full description: https://adventofcode.com/2020/day/15

(() => {
  const startingNumbers = "12,20,0,6,1,17,7"
    .split(",")
    .map(item => parseInt(item));

  const map = new Map();

  startingNumbers
    .slice(0, startingNumbers.length - 1)
    .forEach((item, i) => map.set(item, i));

  let lastNumber = startingNumbers[startingNumbers.length - 1],
    i = startingNumbers.length;

  while (i < 30000000) {
    let number = 0;
    if (map.has(lastNumber)) {
      number = i - 1 - map.get(lastNumber);
    }
    map.set(lastNumber, i - 1);
    lastNumber = number;
    i++;
  }

  console.log(lastNumber);
})();
