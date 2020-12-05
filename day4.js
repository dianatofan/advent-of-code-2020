// --- Day 4: Passport Processing ---
// Full description: https://adventofcode.com/2020/day/4

import { getInput } from "./getInput.js";

// Part 1: check how many passports are valid based on mandatory fields
const areMandatoryFieldsPresent = passportFields => {
  const mandatoryFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  let isValid = true;
  mandatoryFields.forEach(field => {
    if (!passportFields.includes(field)) {
      isValid = false;
    }
  });
  return isValid;
};

(async () => {
  let passports = await getInput(4, true);
  passports = passports.map(pass => pass.replace(/\n/g, " "));
  let count = 0;
  passports.forEach(pass => areMandatoryFieldsPresent(pass) && count++);
  console.log(count);
})();

const containsExactlyOnce = (string, word) => {
  return string.split(word).length - 1 === 1;
};

const hasLeadingZeros = number => {
  let splitted = number.split("");
  let i = 0;
  while (splitted.shift() == 0) {
    i += 1;
  }
  return !!i;
};

// Part 2: check how many passports are valid based on mandatory fields and values
const areFieldValuesCorrect = passportFields => {
  let isValid = true;
  const fieldAndValue = passportFields.split(" ");
  fieldAndValue.forEach(item => {
    if (isValid) {
      const field = item.split(":")[0];
      const value = item.split(":")[1];
      switch (field) {
        case "byr":
          isValid = `${value}`.length === 4 && value >= 1920 && value <= 2002;
          break;
        case "iyr":
          isValid = `${value}`.length === 4 && value >= 2010 && value <= 2020;
          break;
        case "eyr":
          isValid = `${value}`.length === 4 && value >= 2020 && value <= 2030;
          break;
        case "hgt":
          isValid =
            (value.toString().includes("cm") ||
              value.toString().includes("in")) &&
            (value.toString().includes("cm")
              ? value.split("cm")[0] >= 150 && value.split("cm")[0] <= 193
              : value.split("in")[0] >= 59 && value.split("in")[0] <= 76);
          break;
        case "hcl":
          isValid =
            value.toString().charAt(0) === "#" &&
            `${value}`.length === 7 &&
            `${value.split("#")[1]}`.match(/^[a-z0-9]+$/);
          break;
        case "ecl":
          const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
          isValid = eyeColors.some(color =>
            containsExactlyOnce(value.toString(), color)
          );
          break;
        case "pid":
          isValid = `${value}`.length === 9;
          break;
      }
    }
  });
  return isValid;
};

(async () => {
  let passports = await getInput(4, true);
  passports = passports.map(pass => pass.replace(/\n/g, " "));
  let count = 0;
  passports.forEach(
    pass =>
      areMandatoryFieldsPresent(pass) && areFieldValuesCorrect(pass) && count++
  );
  console.log(count);
})();
