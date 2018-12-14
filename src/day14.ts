export function solve(input: string) {
    const recipeCount = parseInt(input);
    const pattern = input.split('').map(x => parseInt(x));

    let recipes = [3, 7];
    let elf1 = 0;
    let elf2 = 1;
    let patternIndex = 0;
    let patternDone = false;
    let patternSeen = 0;

    while (recipeCount + 10 > recipes.length || !patternDone) {
        (recipes[elf1] + recipes[elf2])
            .toString()
            .split('')
            .map(x => parseInt(x))
            .forEach(x => {
                if (pattern[patternIndex] == x && !patternDone) {
                    if (patternIndex == 0) patternSeen = recipes.length;
                    patternIndex++;
                    if (patternIndex >= pattern.length) patternDone = true;
                } else {
                    patternIndex = 0;
                }
                recipes.push(x);
            });

        elf1 = (elf1 + recipes[elf1] + 1) % recipes.length;
        elf2 = (elf2 + recipes[elf2] + 1) % recipes.length;
    }

    return {
        part1: recipes.splice(recipeCount, 10).join(''),
        part2: patternSeen
    };
}
