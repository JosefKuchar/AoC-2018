import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day15';

describe('Day 15', () => {
    const input =
        '#######\n' +
        '#E..EG#\n' +
        '#.#G.E#\n' +
        '#E.##E#\n' +
        '#G..#.#\n' +
        '#..E#.#\n' +
        '#######';

    const result = solve(input);
    it('Part 1', () => {
        expect(result.part1).to.equal(39514);
    });

    it('Part 2', () => {
        expect(result.part2).to.equal(31284);
    });
});
