import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day12';

describe('Day 12', () => {
    const input =
        'initial state: #..#.#..##......###...###\n\n' +
        '...## => #\n' +
        '..#.. => #\n' +
        '.#... => #\n' +
        '.#.#. => #\n' +
        '.#.## => #\n' +
        '.##.. => #\n' +
        '.#### => #\n' +
        '#.#.# => #\n' +
        '#.### => #\n' +
        '##.#. => #\n' +
        '##.## => #\n' +
        '###.. => #\n' +
        '###.# => #\n' +
        '####. => #';

    const result = solve(input);

    it('Part 1', () => {
        expect(result.part1).to.equal(325);
    });
});
