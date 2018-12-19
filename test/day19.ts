import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day19';

describe('Day 19', () => {
    const input =
        '#ip 0\n' +
        'seti 5 0 1\n' +
        'seti 6 0 2\n' +
        'addi 0 1 0\n' +
        'addr 1 2 3\n' +
        'setr 1 0 0\n' +
        'seti 8 0 4\n' +
        'seti 9 0 5';

    const result = solve(input);
    it('Part 1', () => {
        expect(result.part1).to.equal(6);
    });
});
