// Full description: https://adventofcode.com/2020/day/2

import { getInput } from "./getInput.js";

// Part 1: check how many passwords are valid based on min/max letter occurrence
const checkPasswordValidityMinMax = passwordInput => {
  const passwordPolicy = passwordInput.split(":")[0];
  const range = passwordPolicy.split(" ")[0].split("-");
  const min = parseInt(range[0]);
  const max = parseInt(range[1]);
  const letter = passwordPolicy.split(" ")[1];
  const password = passwordInput.split(":")[1];
  let count = 0;
  password.split("").forEach(char => {
    char === letter && count++;
  });
  return count >= min && count <= max;
};

(async () => {
  const passwords = await getInput(2);
  let count = 0;
  passwords.forEach(
    pass => pass && checkPasswordValidityMinMax(pass) && count++
  );
  console.log(count);
})();

// Part 2: check how many passwords are valid based on letter position
const checkPasswordValidityPos = passwordInput => {
  const passwordPolicy = passwordInput.split(":")[0];
  const positions = passwordPolicy.split(" ")[0].split("-");
  const firstPos = parseInt(positions[0]);
  const secondPos = parseInt(positions[1]);
  const letter = passwordPolicy.split(" ")[1];
  const password = passwordInput.split(":")[1];
  let count = 0;
  password[firstPos] === letter && count++;
  password[secondPos] === letter && count++;
  return count === 1;
};

(async () => {
  const passwords = await getInput(2);
  let count = 0;
  passwords.forEach(pass => pass && checkPasswordValidityPos(pass) && count++);
  console.log(count);
})();
