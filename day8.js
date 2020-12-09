// --- Day 8: Handheld Halting ---
// Full description: https://adventofcode.com/2020/day/8

import { getInput } from "./getInput.js";

(async () => {
  const instructions = await getInput(8);
  const executeProgram = instructions => {
    let acc = 0,
      index = 0;
    const visitedIndexes = new Set();
    do {
      // console.log(index, instructions.length);
      if (index === instructions.length - 1) {
        console.log("end: ", acc);
        return false;
      }
      if (visitedIndexes.has(index)) {
        console.log("infinite loop: ", acc);
        return true;
      }
      visitedIndexes.add(index);
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
    } while (true);
  };

  // Part 1: find the acc value before instructions repeat
  console.log(executeProgram(instructions));

  // Part 2: fix infinite loop by swapping a 'jmp' with 'nop' or viceversa
  const findCorruptedInstruction = program => {
    let hasInfiniteLoop = true,
      replacedOpIndex = 0;
    const jmpAndNops = program.filter(
      instruction =>
        instruction.indexOf("nop") > -1 || instruction.indexOf("jmp") > -1
    );
    do {
      const [opCode, arg] = jmpAndNops[replacedOpIndex].split(" ");
      const newProgram = program.map(instruction =>
        instruction === jmpAndNops[replacedOpIndex]
          ? `${
              opCode === "nop" ? "jmp" : opCode === "jmp" ? "nop" : "acc"
            } ${arg}`
          : instruction
      );
      hasInfiniteLoop = executeProgram(newProgram);
      replacedOpIndex++;
    } while (hasInfiniteLoop && jmpAndNops[replacedOpIndex]);
  };

  findCorruptedInstruction(instructions);
})();
