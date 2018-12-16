import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day16';

describe('Day 16', () => {
    const input =
        'Before: [3, 2, 1, 1]\n' +
        '9 2 1 2\n' +
        'After:  [3, 2, 2, 1]\n\n\n\n0 0 0 0';

    const result = solve(input);
    it('Part 1', () => {
        expect(result.part1).to.equal(1);
    });
});
