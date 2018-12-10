import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day8';

describe('Day 8', () => {
    const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

    const result = solve(input);

    it('Part 1', () => {
        expect(result.part1).to.equal(138);
    });

    it('Part 2', () => {
        expect(result.part2).to.equal(66);
    });
});
