// --- Day 16: Ticket Translation ---
// Full description: https://adventofcode.com/2020/day/16

import { getInput } from "./getInput.js";

(async () => {
  // let [rules, myTicket, nearbyTickets] = await getInput(16, true);

  let [rules, myTicket, nearbyTickets] = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`.split("\n\n");
  // Part 1: get nearby tickets scanning error rate
  const acceptedValues = new Set();

  const fieldsAndValues = new Map();
  const fieldsOrder = new Map();

  rules.split("\n").forEach(rule => {
    const minMaxRanges = rule.split(": ")[1].split("or");
    const label = rule.split(": ")[0];
    fieldsAndValues.set(label, []);
    minMaxRanges.forEach(range => {
      const [min, max] = range.trim().split("-");
      let i = parseInt(min);
      while (i <= max) {
        !acceptedValues.has(i) && acceptedValues.add(i);
        fieldsAndValues.set(
          label,
          [...fieldsAndValues.get(label), i].sort((a, b) => a - b)
        );
        i++;
      }
    });
  });
  nearbyTickets = nearbyTickets.split("\n").slice(1);
  const invalidTickets = [];
  let scanningErrorRate = 0;
  nearbyTickets.forEach(tickets => {
    tickets = tickets.split(",");
    tickets.forEach(ticket => {
      ticket = Number(ticket);
      if (!acceptedValues.has(ticket)) {
        scanningErrorRate += ticket;
        !invalidTickets.includes(tickets) &&
          invalidTickets.push(tickets.join(","));
      }
    });
  });
  console.log("Part 1: ", scanningErrorRate);

  // Part 2: get product of the 6 departure fields
  nearbyTickets = nearbyTickets.filter(
    tickets => !invalidTickets.includes(tickets) // discard invalid tickets
  );

  let foundOrder = false,
    i = 0;

  let positions = new Map();

  for (let i = 0; i < nearbyTickets.length; i++) {
    nearbyTickets[i].split(",").forEach((item, i) => {
      item = Number(item);
      positions.has(i + 1)
        ? positions.set(
            i + 1,
            [...positions.get(i + 1), item].sort((a, b) => a - b)
          )
        : positions.set(i + 1, [item]);
    });
  }

  for (let [key1, value1] of fieldsAndValues) {
    for (let [key2, value2] of positions) {
      if (
        value2.every(elem => value1.includes(elem)) &&
        !fieldsOrder.has(key1)
      ) {
        fieldsOrder.set(key1, key2);
      }
    }
  }

  console.log(fieldsAndValues);
})();
