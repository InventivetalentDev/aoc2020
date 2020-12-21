'use strict'

const util = require("./util");

// Part 1
// ======

const intersect = (arr1, arr2) => arr1.filter((elm) => arr2.includes(elm));
const unique = (arr) => Array.from(new Set(arr));

const part1 = input => {
    const parsed = util.getLines(input).map(parse);
    const allergens = mapAllergens(parsed);
    console.log(allergens);

    const allIngredients = parsed
        .map(({ingredients}) => ingredients)
        .reduce((acc, arr) => acc.concat(...arr));

    const dangerousIngredients = Object.values(allergens).map(
        ([ingredient]) => ingredient
    );

    const safeIngredients = allIngredients.filter(
        (ingredient) => !dangerousIngredients.includes(ingredient)
    );

    return safeIngredients.length;
}

// Part 2
// ======

const part2 = input => {
    const parsed = util.getLines(input).map(parse);
    const allergens = mapAllergens(parsed);
    console.log(allergens);

    const sorted = Object.keys(allergens).sort();
    return sorted.map(a => allergens[a][0]).join(",");
}

// Stolen from https://github.com/robjohnstone2/aoc2020/blob/main/day21/index.js
function mapAllergens(parsed) {

    console.log(parsed);

    const mappedAllergens = parsed.reduce((accumulator, {ingredients, allergens}) => {
        allergens.forEach(allergen => {
            if (accumulator.hasOwnProperty(allergen)) {
                accumulator[allergen] = intersect(accumulator[allergen], ingredients);
            } else {
                accumulator[allergen] = ingredients;
            }
        });
        return accumulator;
    }, {});
    console.log(mappedAllergens)

    while (true) {
        let changed = false;
        const ingredientsForAllergen = Object.entries(mappedAllergens);
        const matchedIngredients = ingredientsForAllergen
            .filter(([allergen, ingredients]) => ingredients.length === 1)
            .map(([allergen, [i]]) => i);
        ingredientsForAllergen.forEach(([allergen, ingredients]) => {
            const initialIngredients = mappedAllergens[allergen];
            mappedAllergens[allergen] =
                mappedAllergens[allergen].length === 1
                    ? mappedAllergens[allergen]
                    : mappedAllergens[allergen].filter(
                    (ingredient) => !matchedIngredients.includes(ingredient)
                    );
            if (mappedAllergens[allergen].length !== initialIngredients.length) {
                changed = true;
            }
        });

        if (!changed) break;
    }

    return mappedAllergens;
}

function parse(line) {
    const split1 = line.replace(/\)/, "").split("\(contains");
    const ingredients = split1[0].split(" ").map(s => s.trim()).filter(s => s.length > 1);
    const allergens = split1.length <= 1 ? [] : split1[1].split(", ").map(s => s.trim()).filter(s => s.length > 1);
    return {
        ingredients,
        allergens
    };
}

module.exports = {part1, part2}
