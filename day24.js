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

  const flipTilesFor100Days = () => {
    let bounds = [...blackTiles].reduce(
      ([bX, bY], coord) => {
        const [x, y] = coord.split(",").map(Number);
        if (x <= bX[0]) bX[0] = Math.ceil(x - 1);
        else if (x >= bX[1]) bX[1] = Math.ceil(x + 1);
        if (y <= bY[0]) bY[0] = y - 1;
        else if (y >= bY[1]) bY[1] = y + 1;
        return [bX, bY];
      },
      [
        [0, 0],
        [0, 0]
      ]
    );
    for (let day = 1; day <= 100; day++) {
      const prevBlackTiles = new Set(blackTiles);
      // re-define cube boundaries
      bounds = [...prevBlackTiles].reduce(
        ([bX, bY], coord) => {
          const [x, y] = coord.split(",").map(Number);
          if (x <= bX[0]) bX[0] = Math.ceil(x - 2);
          else if (x >= bX[1]) bX[1] = Math.ceil(x + 2);
          if (y <= bY[0]) bY[0] = y - 1;
          else if (y >= bY[1]) bY[1] = y + 1;
          return [bX, bY];
        },
        [
          [0, 0],
          [0, 0]
        ]
      );
      for (let x = bounds[0][0]; x <= bounds[0][1]; x++) {
        for (let y = bounds[1][0]; y <= bounds[1][1]; y++) {
          const offset = (y % 2) / 2;
          let _x = x - offset;
          let count = 0;
          count = [
            prevBlackTiles.has(`${_x + 1},${y}`),
            prevBlackTiles.has(`${_x - 1},${y}`),
            prevBlackTiles.has(`${_x + 0.5},${y - 1}`),
            prevBlackTiles.has(`${_x - 0.5},${y - 1}`),
            prevBlackTiles.has(`${_x + 0.5},${y + 1}`),
            prevBlackTiles.has(`${_x - 0.5},${y + 1}`)
          ].filter(item => item).length;

          if (prevBlackTiles.has(`${_x},${y}`)) {
            if (count === 0 || count > 2) {
              blackTiles.delete(`${_x},${y}`);
            }
          } else {
            if (count === 2) {
              blackTiles.add(`${_x},${y}`);
            }
          }
        }
      }
      console.log(`Day ${day}: ${blackTiles.size}`);
    }
  };

  flipTilesFor100Days();
})();
