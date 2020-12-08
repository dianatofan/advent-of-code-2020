// --- Day 8: Handheld Halting ---
// Full description: https://adventofcode.com/2020/day/8

import { getInput } from "./getInput.js";

// Part 1: find the acc value before instructions repeat
(async () => {
  const instructions = await getInput(8);
  const test = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;
  let acc = 0,
    index = 0;

  const visitedIndexes = [];

  do {
    visitedIndexes.push(index);
    const [opCode, arg] = instructions[index].split(" ");
    switch (opCode) {
      case "acc":
        acc += parseInt(arg);
        index++;
        break;
      case "jmp":
        index += parseInt(arg);
        break;
      case "nop":
        index++;
        break;
    }
  } while (!visitedIndexes.includes(index));

  console.log(acc);
})();
