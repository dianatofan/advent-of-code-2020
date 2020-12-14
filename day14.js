// --- Day 14: Docking Data ---
// Full description: https://adventofcode.com/2020/day/14

import { getInput } from "./getInput.js";

const decimalToBinary = dec => {
  const binary = Number(dec).toString(2);
  return binary.length < 36 ? String(binary).padStart(36, "0") : binary;
};

const combineBits = (value, bitmask, withX) =>
  bitmask
    .split("")
    .map((bit, i) =>
      bit === "X"
        ? withX
          ? "X"
          : value[i]
        : withX
        ? bit === "1"
          ? "1"
          : value[i]
        : bit
    )
    .join("");

(async () => {
  const program = await getInput(14);
  let bitmask = "";
  const mem1 = [],
    mem2 = [];

  program.forEach(instruction => {
    if (instruction.includes("mask")) {
      bitmask = instruction.split("mask = ")[1];
    } else {
      let [location, value] = instruction.split(" = ");
      location = location.match(/\d/g).join("");
      mem1[location] = combineBits(decimalToBinary(value), bitmask);
    }
  });
  const sum1 = mem1.reduce((acc, item) => acc + parseInt(item, 2), 0);
  console.log("Part 1: ", sum1);

  program.forEach(instruction => {
    if (instruction.includes("mask")) {
      bitmask = instruction.split("mask = ")[1];
    } else {
      let [location, value] = instruction.split(" = ");
      location = location.match(/\d/g).join("");
      const result = combineBits(decimalToBinary(location), bitmask, true);
      const possibleAddresses = result.split("X").reduce((acc, floater) => {
        if (acc.length === 0) return [floater];
        const ones = [...acc].map(x => x + "0" + floater);
        const zeroes = [...acc].map(x => x + "1" + floater);
        return [...ones, ...zeroes];
      }, []);
      possibleAddresses.forEach(
        address => (mem2[parseInt(address, 2)] = value)
      );
    }
  });
  const sum2 = Object.values(mem2).reduce(
    (acc, item) => acc + parseInt(item),
    0
  );
  console.log("Part 2: ", sum2);
})();
