import * as fs from "fs";
import * as path from "path";

export function part1(numbers: number[]): number {
    return numbers.reduce((x, y) => x + y);
}

export function part2(numbers: number[]): number {
    let sums = [0];
    let sum = 0;
    for (let i = 0; ; i++) {
        sum += numbers[i % numbers.length];
        if (sums.some(x => x == sum)) return sum;
        sums.push(sum);
    }
}

let numbers = fs
    .readFileSync("inputs/day1.txt", "utf8")
    .split("\n")
    .map(x => parseInt(x));

console.log("Part 1: ", part1(numbers));
console.log("Part 2: ", part2(numbers));