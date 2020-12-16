// --- Day 16: Ticket Translation ---
// Full description: https://adventofcode.com/2020/day/16

import { getInput } from "./getInput.js";

(async () => {
  let [rules, myTicket, nearbyTickets] = await getInput(16, true);
  //   let [rules, myTicket, nearbyTickets] = `class: 1-3 or 5-7
  // row: 6-11 or 33-44
  // seat: 13-40 or 45-50

  // your ticket:
  // 7,1,14

  // nearby tickets:
  // 7,3,47
  // 40,4,50
  // 55,2,20
  // 38,6,12`.split("\n\n");
  const acceptedValues = new Set();
  rules.split("\n").forEach(rule => {
    const minMaxRanges = rule.split(": ")[1].split("or");
    minMaxRanges.forEach(range => {
      const [min, max] = range.trim().split("-");
      let i = parseInt(min);
      while (i <= max) {
        !acceptedValues.has(i) && acceptedValues.add(i);
        i++;
      }
    });
  });
  nearbyTickets = nearbyTickets
    .split("\n")
    .slice(1)
    .flatMap(ticket => ticket.split(","));
  let scanningErrorRate = 0;
  nearbyTickets.forEach(ticket => {
    ticket = Number(ticket);
    if (!acceptedValues.has(ticket)) {
      scanningErrorRate += ticket;
    }
  });
  console.log(scanningErrorRate);
})();
