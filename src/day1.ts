export function part1(numbers: number[]): number {
    return numbers.reduce((x, y) => x + y); // Get sum
}

export function part2(numbers: number[]): number {
    let sums = new Set([0]);
    let sum = 0;
    for (let i = 0; ; i++) {
        sum += numbers[i % numbers.length];
        if (sums.has(sum)) return sum; // Check if the sum has been already seen
        sums.add(sum);
    }
}

export function solve(input: string) {
    let numbers = input.split('\n').map(x => parseInt(x));
    return {
        part1: part1(numbers),
        part2: part2(numbers)
    };
}
