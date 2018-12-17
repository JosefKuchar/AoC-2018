import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day17';

describe('Day 16', () => {
    const input =
        'x=495, y=2..7\n' +
        'y=7, x=495..501\n' +
        'x=501, y=3..7\n' +
        'x=498, y=2..4\n' +
        'x=506, y=1..2\n' +
        'x=498, y=10..13\n' +
        'x=504, y=10..13\n' +
        'y=13, x=498..504';

    const result = solve(input);
    it('Part 1', () => {
        expect(result.part1).to.equal(57);
    });

    it('Part 2', () => {
        expect(result.part2).to.equal(29);
    });
});
