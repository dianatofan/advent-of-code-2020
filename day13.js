// --- Day 13: Shuttle Search ---
// Full description: https://adventofcode.com/2020/day/13

import { getInput } from "./getInput.js";

(async () => {
  const schedules = await getInput(13);
  const test = `939
7,13,x,x,59,x,31,19`.split("\n");
  // Part 1: find earliest bus to take to the airport
  const earliestTimestamp = schedules[0];
  const busIDs = schedules[1]
    .split(",")
    .filter(item => item !== "x")
    .map(item => parseInt(item));
  const busDeparturesTable = busIDs
    .map(id => {
      let loops = 0;
      while (id * loops < earliestTimestamp) {
        loops++;
      }
      return { id, earliest: id * loops };
    })
    .sort((a, b) => (a.earliest > b.earliest ? 1 : -1));
  const earliestBus = busDeparturesTable[0];
  console.log(
    "Part 1: ",
    (earliestBus.earliest - earliestTimestamp) * earliestBus.id
  );
  //   console.log(test, earliestTimestamp, busIDs);
})();
