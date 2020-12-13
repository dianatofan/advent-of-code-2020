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

  // Part 2: What is the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list?
  const busIDsWithX = schedules[1].split(",").map(item => parseInt(item));
  let timestamp = 0,
    waitingMinutes = 1;

  const busGroups = busIDs.map(bus => {
    return [bus, busIDsWithX.indexOf(bus)];
  });
  busGroups.forEach((bus, i) => {
    let isEarliestTimestampFound = false;
    do {
      if (
        (timestamp + parseInt(busGroups[i][1])) % parseInt(busGroups[i][0]) ===
        0
      ) {
        isEarliestTimestampFound = true;
        waitingMinutes *= parseInt(busGroups[i][0]);
      } else {
        timestamp += waitingMinutes;
      }
    } while (!isEarliestTimestampFound);
  });
  console.log("Part 2: ", timestamp);
})();
