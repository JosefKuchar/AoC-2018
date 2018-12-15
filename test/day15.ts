import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day15';

describe('Day 15', () => {
    it('Test', () => {
        const input /*
            '#######\n' +
            '#.G...#\n' +
            '#...EG#\n' +
            '#.#.#G#\n' +
            '#..G#E#\n' +
            '#.....#\n' +
            '#######';*/ =
            '#######\n' +
            '#E..EG#\n' +
            '#.#G.E#\n' +
            '#E.##E#\n' +
            '#G..#.#\n' +
            '#..E#.#\n' +
            '#######';

        const result = solve(input);
        expect(result.part1).to.equal(0);
    });
});
