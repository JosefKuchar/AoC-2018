import { expect } from "chai";
import "mocha";
import { solve } from "../src/day3";

describe("Day 3", () => {
    const result = solve("#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2");
    
    it("Part 1", () => {
        expect(result.part1).to.equal(4);
    });

    it("Part 2", () => {
        expect(result.part2).to.equal(3);
    });
});
