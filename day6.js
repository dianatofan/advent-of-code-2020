// --- Day 6: Custom Customs ---
// Full description: https://adventofcode.com/2020/day/6

import { getInput } from "./getInput.js";

const removeDuplicateCharacters = string =>
  string
    .split("")
    .filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .join("");

// Part 1: find sum of the counts to which anyone answered yes
(async () => {
  let answers = await getInput(6, true);
  answers = answers.map(ans => ans.replace(/\n/g, " "));
  let groupsQuestionsAnswered = 0;
  answers.forEach(groupAnswer => {
    const questionsAnswered = removeDuplicateCharacters(
      groupAnswer.replace(/\s/g, "")
    );
    groupsQuestionsAnswered += questionsAnswered.length;
  });
  console.log(groupsQuestionsAnswered);
})();

// Part 2: find sum of the counts to which everyone answered yes
(async () => {
  let answers = await getInput(6, true);
  answers = answers.map(ans => ans.replace(/\n/g, " ")).filter(x => x);
  let count = 0;
  answers.forEach(groupAnswer => {
    const firstPersonAnswer = groupAnswer.split(" ")[0];
    count += [...firstPersonAnswer].filter(char =>
      groupAnswer
        .split(" ")
        .filter(x => x)
        .every(ans => ans.includes(char))
    ).length;
  });
  console.log("Count: ", count);
})();
