// --- Day 21: Allergen Assessment ---
// Full description: https://adventofcode.com/2020/day/21

import { getInput } from "./getInput.js";

(async () => {
  const foods = await getInput(21);
  const foodList = [];
  const allIngredients = new Set(),
    allAllergens = new Set();

  foods.forEach(foodItem => {
    let [ingredients, allergens] = foodItem.split(" (contains ");
    ingredients = ingredients.split(" ").sort();
    allergens = allergens
      .replace(")", "")
      .split(", ")
      .sort();
    foodList.push([ingredients, allergens]);
    ingredients.forEach(ingredient => allIngredients.add(ingredient));
    allergens.forEach(allergen => allAllergens.add(allergen));
  });

  const ingredientsWithAllergens = {};

  const intersect = (arr1, arr2) => arr1.filter(a => arr2.includes(a));

  const findAllergens = (usedfoodList, commonIngredients, commonAllergens) => {
    for (const [foodItemId, [ingredient, allergen]] of foodList.entries()) {
      if (usedfoodList.includes(foodItemId)) return;

      const nextIngredient = intersect(commonIngredients, ingredient).filter(
        i => !Object.values(ingredientsWithAllergens).includes(i)
      );
      const nextAllergen = intersect(commonAllergens, allergen).filter(
        i => !Object.keys(ingredientsWithAllergens).includes(i)
      );

      if (nextIngredient.length === 0 || nextAllergen.length === 0) continue;

      if (nextIngredient.length === nextAllergen.length) {
        for (const [id, ingredient] of nextIngredient.entries()) {
          const allergen = nextAllergen[id];
          ingredientsWithAllergens[allergen] = ingredient;
        }
      }
      findAllergens(
        [...usedfoodList, foodItemId],
        nextIngredient,
        nextAllergen
      );
    }
  };

  let allAlergensFound = false;

  while (!allAlergensFound) {
    findAllergens([], [...allIngredients], [...allAllergens]);
    if (Object.keys(ingredientsWithAllergens).length === allAllergens.size) {
      allAlergensFound = true;
    }
  }

  const safeIngredients = [...allIngredients].filter(
    ingredient => !Object.values(ingredientsWithAllergens).includes(ingredient)
  );

  const ingredientsWithoutAllergens = foodList.reduce(
    (acc, [ingredients]) =>
      acc + intersect(ingredients, safeIngredients).length,
    0
  );

  console.log("Part 1: ", ingredientsWithoutAllergens);

  const dangerousIngredientList = Object.keys(ingredientsWithAllergens)
    .sort()
    .map(a => ingredientsWithAllergens[a])
    .join(",");

  console.log("Part 2: ", dangerousIngredientList);
})();
