// --- Day 19: Monster Messages ---
// Full description: https://adventofcode.com/2020/day/19

import { getInput } from "./getInput.js";

(async () => {
  const input = await getInput(19, true);

  let [rules, messages] = input;
  rules = rules.split("\n").reduce((acc, item) => {
    const [key, value] = item.split(": ");
    acc[key] = value;
    return acc;
  }, {});
  messages = messages.split("\n");

  let ruleToRegexp = {};

  const findMatchingStrings = rule => {
    let string = "";
    if (/^".*"$/.test(rule)) {
      string = rule.replace(/"/g, "");
    } else if (/\|/.test(rule)) {
      const options = rule.split(" | ");
      string = `(${findMatchingStrings(
        options[0],
        rules
      )}|${findMatchingStrings(options[1], rules)})`;
    } else {
      const keys = rule.split(" ");
      string = keys.map(key => findMatchingStrings(rules[key], rules)).join("");
    }
    ruleToRegexp[rule] = string;
    return string;
  };

  findMatchingStrings(rules[0]);

  const mainRule = new RegExp("^" + ruleToRegexp[rules[0]] + "$");

  let sum1 = 0;
  messages.forEach(message => mainRule.test(message) && sum1++);
  console.log("Part 1: ", sum1);

  rules["0"] = "8 11";
  rules["8"] = "42 | 42 8";
  rules["11"] = "42 31 | 42 11 31";

  findMatchingStrings(rules[42], rules);
  findMatchingStrings(rules[31], rules);

  const rule = new RegExp(
    "^(?<group42>(" +
      ruleToRegexp[rules[42]] +
      ")+)(?<group31>(" +
      ruleToRegexp[rules[31]] +
      ")+)$"
  );

  let sum2 = 0;
  messages.forEach(message => {
    const matches = rule.exec(message);
    if (matches) {
      const { groups } = matches;
      const matches42 = groups.group42.match(
        new RegExp(ruleToRegexp[rules[42]], "g")
      ).length;
      const matches31 = groups.group31.match(
        new RegExp(ruleToRegexp[rules[31]], "g")
      ).length;
      matches42 > matches31 && sum2++;
    }
  });
  console.log("Part 2: ", sum2);
})();
