// --- Day 17: Conway Cubes ---
// Full description: https://adventofcode.com/2020/day/17

import { getInput } from "./getInput.js";

(async () => {
  let cubes = await getInput(17);
  cubes = cubes.map(item => item.split(""));

  // Create map containing cube coords (x, y, z) and state (active/inactive)
  let cubeMap = new Map();

  cubes.forEach((line, y) => {
    line.forEach((value, x) => {
      cubeMap.set([x, y, 0].join(","), value === "#");
    });
  });

  const getNeighbours = (cubeCoords, cubeMap) => {
    const neighbours = [];
    const [x, y, z] = cubeCoords;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        for (let k = z - 1; k <= z + 1; k++) {
          if (i != x || j != y || k != z) {
            const key = [i, j, k].join`,`;
            if (cubeMap.has(key)) {
              neighbours.push(cubeMap.get(key));
            }
          }
        }
      }
    }
    return neighbours;
  };

  const executeSixCycles = () => {
    for (let i = 0; i < 6; i++) {
      const updatedCubeMap = new Map();
      const keys = cubeMap.keys();
      let minX = 0,
        minY = 0,
        minZ = 0,
        maxX = 0,
        maxY = 0,
        maxZ = 0;

      for (const key of keys) {
        const [x, y, z] = key.split(",").map(item => parseInt(item));
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (z < minZ) minZ = z;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        if (z > maxZ) maxZ = z;
      }

      for (let x = minX - 1; x <= maxX + 1; x++) {
        for (let y = minY - 1; y <= maxY + 1; y++) {
          for (let z = minZ - 1; z <= maxZ + 1; z++) {
            const neighbours = getNeighbours([x, y, z], cubeMap);
            const activeNeighbours = neighbours.filter(item => item).length;
            const key = [x, y, z].join(",");
            const isActive = cubeMap.has(key) ? cubeMap.get(key) : false;
            if (isActive && activeNeighbours !== 2 && activeNeighbours !== 3) {
              updatedCubeMap.set(key, false);
            } else if (!isActive && activeNeighbours === 3) {
              updatedCubeMap.set(key, true);
            } else {
              updatedCubeMap.set(key, isActive);
            }
          }
        }
      }
      cubeMap = updatedCubeMap;
    }
  };

  executeSixCycles();
  let sum = 0;
  for (const cube of cubeMap.values()) {
    cube && sum++;
  }

  console.log(sum);
})();
