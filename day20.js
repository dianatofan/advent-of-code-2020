// --- Day 20: Jurassic Jigsaw ---
// Full description: https://adventofcode.com/2020/day/20

import { getInput } from "./getInput.js";

(async () => {
  const tiles = await getInput(20, true);

  const allBorders = new Map();
  const tilesBorders = {};
  tiles.forEach(tile => {
    const lines = tile.split("\n");
    const id = lines[0].match(/\d+/g)[0];
    const imageTiles = lines.slice(1);
    const borders = [
      imageTiles[0],
      imageTiles[9],
      imageTiles.reduce((a, b) => a + b[0], ""),
      imageTiles.reduce((a, b) => a + b[9], "")
    ];
    borders.forEach(border => {
      allBorders.set(
        border,
        allBorders.has(border) ? allBorders.get(border) + 1 : 1
      );
    });
    tilesBorders[id] = borders;
  });

  const reverse = string =>
    string
      .split("")
      .reverse()
      .join("");

  let fourCornersMultiplied = 1;
  Object.keys(tilesBorders).forEach(tileId => {
    if (
      tilesBorders[tileId].reduce(
        (a, border) =>
          a + allBorders.get(border) + (allBorders.get(reverse(border)) || 0),
        -4
      ) == 2
    ) {
      fourCornersMultiplied *= tileId;
    }
  });
  console.log("Part 1: ", fourCornersMultiplied);
})();
