// --- Day 24: Lobby Layout ---
// Full description: https://adventofcode.com/2020/day/24

import { getInput } from "./getInput.js";

(async () => {
  let tiles = await getInput(24);
  //   let tiles = `sesenwnenenewseeswwswswwnenewsewsw
  // neeenesenwnwwswnenewnwwsewnenwseswesw
  // seswneswswsenwwnwse
  // nwnwneseeswswnenewneswwnewseswneseene
  // swweswneswnenwsewnwneneseenw
  // eesenwseswswnenwswnwnwsewwnwsene
  // sewnenenenesenwsewnenwwwse
  // wenwwweseeeweswwwnwwe
  // wsweesenenewnwwnwsenewsenwwsesesenwne
  // neeswseenwwswnwswswnw
  // nenwswwsewswnenenewsenwsenwnesesenew
  // enewnwewneswsewnwswenweswnenwsenwsw
  // sweneswneswneneenwnewenewwneswswnese
  // swwesenesewenwneswnwwneseswwne
  // enesenwswwswneneswsenwnewswseenwsese
  // wnwnesenesenenwwnenwsewesewsesesew
  // nenewswnwewswnenesenwnesewesw
  // eneswnwswnwsenenwnwnwwseeswneewsenese
  // neswnwewnwnwseenwseesewsenwsweewe
  // wseweeenwnesenwwwswnew`.split("\n");
  tiles = tiles.map(tile => {
    let letters = tile.split("");
    const tileDirections = [];
    while (letters.length) {
      let letter = letters.shift();
      if (/n|s/.test(letter)) letter = letter + letters.shift();
      tileDirections.push(letter);
    }
    return tileDirections;
  });

  const blackTiles = new Set();
  const flipTiles = () => {
    /*
           N
     NW ---|--- NE
      W ---|--- E
     SW ---|--- SE
           S         
    */
    tiles.forEach(directions => {
      let [x, y] = [0, 0];
      directions.forEach(direction => {
        switch (direction) {
          case "e":
            x++;
            break;
          case "w":
            x--;
            break;
          case "nw":
            x -= 0.5;
            y--;
            break;
          case "ne":
            x += 0.5;
            y--;
            break;
          case "sw":
            x -= 0.5;
            y++;
            break;
          case "se":
            x += 0.5;
            y++;
            break;
        }
      });
      blackTiles.has(`${x},${y}`)
        ? blackTiles.delete(`${x},${y}`)
        : blackTiles.add(`${x},${y}`);
    });
  };
  flipTiles();
  console.log("Part 1: ", blackTiles);
})();
