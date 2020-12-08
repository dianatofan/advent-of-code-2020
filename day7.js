// --- Day 7: Handy Haversacks ---
// Full description: https://adventofcode.com/2020/day/7

import { getInput } from "./getInput.js";

// Part 1: how many bag colors can eventually contain at least one shiny gold bag>
(async () => {
  const rules = await getInput(7);
  const map = new Map();

  rules.forEach((rule, i) => {
    const [bagColor, bagsInside] = rule.split(" bags contain ");
    bagsInside &&
      bagsInside
        .replace(/\./, "")
        .split(", ")
        .map(txt => {
          const { groups } = /((?<number>\d+) )?(?<color>.*)/.exec(
            txt.replace(/ bags?/, "")
          );
          // console.log(groups);
          if (!map.has(bagColor)) {
            map.set(bagColor, []);
          }
          if (!groups.number) groups.number = 0;
          map.set(bagColor, [...map.get(bagColor), groups]);
        });

    const containsShinyGold = color => {
      if (color === "shiny gold") return true;
      if (!map.has(color)) return false;

      const bagsWithin = map.get(color);
      for (const { color: bag } of bagsWithin) {
        if (containsShinyGold(bag)) {
          return true;
        }
      }
      return false;
    };

    const colors = map.keys();
    let count = 0;

    for (const color of colors) {
      containsShinyGold(color) && color != "shiny gold" && count++;
    }

    console.log(count);
  });
})();
