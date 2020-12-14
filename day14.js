// --- Day 14: Docking Data ---
// Full description: https://adventofcode.com/2020/day/14

import { getInput } from "./getInput.js";

const decimalToBinary = dec => {
  const binary = Number(dec).toString(2);
  return binary.length < 36 ? String(binary).padStart(36, "0") : binary;
};

const combineBits = (value, bitmask) =>
  bitmask
    .split("")
    .map((bit, i) => (bit === "X" ? value[i] : bit))
    .join("");

(async () => {
  const program = await getInput(14);
  let bitmask = "";
  const mem = [];
  const test = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`.split("\n");
  program.forEach(instruction => {
    if (instruction.includes("mask")) {
      bitmask = instruction.split("mask = ")[1];
    } else {
      let [location, value] = instruction.split(" = ");
      location = location.match(/\d/g).join("");
      mem[location] = combineBits(decimalToBinary(value), bitmask);
    }
  });
  const sum = mem.reduce((acc, item) => acc + parseInt(item, 2), 0);
  console.log("Part 1: ", sum);
})();
