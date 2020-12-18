// --- Day 18: Operation Order ---
// Full description: https://adventofcode.com/2020/day/18

import { getInput } from "./getInput.js";

(async () => {
  const expressions = await getInput(18);

  const solveExpression = expression => {
    const numbers = expression.match(/\d+/g);
    const symbols = expression.match(/[+*]/g);
    let result = 0;
    symbols.forEach((symbol, i) => {
      result = eval(`${result || numbers[i]} ${symbol} ${numbers[i + 1]}`); // drop operators precedence
    });
    return result;
  };

  let sum = 0;
  expressions.forEach(expression => {
    if (expression.indexOf("(") > -1) {
      do {
        expression = expression.replace(/\(([^()]+)\)/g, (match, group) =>
          solveExpression(group)
        );
      } while (expression.indexOf("(") > -1);
    }
    sum += solveExpression(expression);
  });

  console.log(sum);
})();
