import * as fs from "fs";
import * as path from "path";

export function part1(numbers: number[]): number {
    return numbers.reduce((x, y) => x + y);
}

export function part2(numbers: number[]): number {
    let sums = new Set();
    sums.add(0);
    let sum = 0;
    for (let i = 0; ; i++) {
        sum += numbers[i % numbers.length];
        if (sums.has(sum)) return sum;
        sums.add(sum);
    }
}

let numbers = fs
    .readFileSync("inputs/day1.txt", "utf8")
    .split("\n")
    .map(x => parseInt(x));

console.log("Part 1: ", part1(numbers));
console.log("Part 2: ", part2(numbers));