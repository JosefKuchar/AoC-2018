import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day6';

describe('Day 6', () => {
    const input =
        '1, 1\n' +
        '1, 6\n' +
        '8, 3\n' +
        '3, 4\n' +
        '5, 5\n' +
        '8, 9'

    const result = solve(input, 32);

    it('Part 1', () => {
        expect(result.part1).to.equal(17);
    });

    it('Part 2', () => {
        expect(result.part2).to.equal(16);
    });
});
