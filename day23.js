// --- Day 23: Crab Cups ---
// Full description: https://adventofcode.com/2020/day/23

(() => {
  let cupLabelling = "158937462".split("").map(Number),
    currentCup = cupLabelling[0];
  const length = cupLabelling.length,
    moves = 100;
  const moveCups = () => {
    for (let i = 0; i < moves; i++) {
      const pickedUpCups = [
        cupLabelling[(i + 1) % length],
        cupLabelling[(i + 2) % length],
        cupLabelling[(i + 3) % length]
      ];
      const remainingCups = cupLabelling.filter(
        cup => !pickedUpCups.includes(cup)
      );
      let destinationCup = null,
        index = 1;
      while (!destinationCup) {
        if (currentCup - index < Math.min(...remainingCups)) {
          destinationCup = Math.max(...remainingCups);
          break;
        }
        if (remainingCups.includes(currentCup - index)) {
          destinationCup = currentCup - index;
          break;
        }
        index++;
      }
      remainingCups.splice(
        remainingCups.indexOf(destinationCup) + 1,
        0,
        ...pickedUpCups
      );
      currentCup =
        cupLabelling[(cupLabelling.indexOf(currentCup) + 1) % length];
    }
    let j = (cupLabelling.indexOf(1) + 1) % length;
    const result = [];
    while (j != cupLabelling.indexOf(1)) {
      result.push(cupLabelling[j]);
      j = (j + 1) % length;
    }
    console.log(result.join(""));
  };

  moveCups();
})();
