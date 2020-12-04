// Full description: https://adventofcode.com/2020/day/2

import { getInput } from "./getInput.js";

// Part 1: check how many passwords are valid
const checkPasswordValidity = passwordInput => {
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
  return count >= min && count <= max ? true : false;
};

(async () => {
  const passwords = await getInput(2);
  let count = 0;
  passwords.forEach(pass => pass && checkPasswordValidity(pass) && count++);
  console.log(count);
})();
