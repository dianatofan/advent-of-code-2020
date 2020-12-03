import fetch from "node-fetch";

const cookie =
  "_ga=GA1.2.1612378626.1606302247; session=53616c7465645f5fb63e58f089e9ffa5183fad48f1f0892de5a26d8e0d424f9dd8e366299b6eb2d0a34d4cf6e96e3cdd; _gid=GA1.2.1960973900.1607022836; _gat=1";

// Fetch input data for each AoC challenge given the day number
export const getInput = async dayNumber =>
  await fetch(`https://adventofcode.com/2020/day/${dayNumber}/input`, {
    method: "GET",
    headers: {
      cookie
    },
    credentials: "same-origin"
  })
    .then(response => response.text())
    .then(data => data.split("\n"));
