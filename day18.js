// --- Day 18: Operation Order ---
// Full description: https://adventofcode.com/2020/day/18

import { getInput } from "./getInput.js";

(async () => {
  const expressions = await getInput(18);

  const solveExpression = (expression, hasAdditionPrecedence) => {
    if (hasAdditionPrecedence) {
      if (expression.indexOf("+") > -1) {
        do {
          expression = expression.replace(
            /(\d+) \+ (\d+)/g,
            (match, number1, number2) => parseInt(number1) + parseInt(number2)
          );
        } while (expression.indexOf("+") > -1);
      }
    }
    const numbers = expression.match(/\d+/g);
    const symbols = expression.match(/[+*]/g);
    let result = 0;
    symbols &&
      symbols.forEach((symbol, i) => {
        result = eval(`${result || numbers[i]} ${symbol} ${numbers[i + 1]}`); // drop operators precedence
      });
    return hasAdditionPrecedence ? eval(expression) : result;
  };

  // Part 1: solve expressions with operators precedence changed left-to-right
  let sum1 = 0;
  expressions.forEach(expression => {
    if (expression.indexOf("(") > -1) {
      do {
        expression = expression.replace(/\(([^()]+)\)/g, (match, group) =>
          solveExpression(group)
        );
      } while (expression.indexOf("(") > -1);
    }
    sum1 += solveExpression(expression);
  });

  console.log("Part 1: ", sum1);

  const test = [`5 + (8 * 3 + 9 + 3 * 4 * 3)`];

  // Part 2: solve expressions with operators precedence changed - addition before multiplication
  let sum2 = 0;

  expressions.forEach(expression => {
    if (expression.indexOf("(") > -1) {
      do {
        expression = expression.replace(/\(([^()]+)\)/g, (match, group) =>
          solveExpression(group, true)
        );
      } while (expression.indexOf("(") > -1);
    }
    expression = solveExpression(expression, true);
    sum2 += expression;
  });

  console.log("Part 2: ", sum2);
})();
