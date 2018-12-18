import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day18';

describe('Day 18', () => {
    const input =
        '.#.#...|#.\n' +
        '.....#|##|\n' +
        '.|..|...#.\n' +
        '..|#.....#\n' +
        '#.#|||#|#|\n' +
        '...#.||...\n' +
        '.|....|...\n' +
        '||...#|.#|\n' +
        '|.||||..|.\n' +
        '...#.|..|.';

    const result = solve(input);
    it('Part 1', () => {
        expect(result.part1).to.equal(1147);
    });
});
