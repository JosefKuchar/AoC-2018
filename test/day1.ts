import { expect } from "chai";
import "mocha";
import { part1, part2 } from "../src/day1";

describe("Day 1", () => {
    describe("Part 1", () => {
        it("+1, -2, +3, +1 results in 3", () => {
            const result = part1([1, -2, 3, 1]);
            expect(result).to.equal(3);
        });

        it("+1, +1, +1 results in 3", () => {
            const result = part1([1, 1, 1]);
            expect(result).to.equal(3);
        });

        it("+1, +1, -2 results in 0", () => {
            const result = part1([1, 1, -2]);
            expect(result).to.equal(0);
        });

        it("-1, -2, -3 results in -6", () => {
            const result = part1([-1, -2, -3]);
            expect(result).to.equal(-6);
        });
    });

    describe("Part 2", () => {
        it("+1, -2, +3, +1 first reaches 2 twice", () => {
            const result = part2([1, -2, 3, 1]);
            expect(result).to.equal(2);
        });

        it("+1, -1 first reaches 0 twice", () => {
            const result = part2([1, -1]);
            expect(result).to.equal(0);
        });

        it("+3, +3, +4, -2, -4 first reaches 10 twice", () => {
            const result = part2([3, 3, 4, -2, -4]);
            expect(result).to.equal(10);
        });

        it("-6, +3, +8, +5, -6 first reaches 5 twice", () => {
            const result = part2([-6, 3, 8, 5, -6]);
            expect(result).to.equal(5);
        });

        it("+7, +7, -2, -7, -4 first reaches 14 twice", () => {
            const result = part2([7, 7, -2, -7, -4]);
            expect(result).to.equal(14);
        });
    });
});
