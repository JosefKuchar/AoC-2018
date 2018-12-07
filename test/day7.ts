import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day7';

describe('Day 7', () => {
    const input = 
        'Step C must be finished before step A can begin.\n' +
        'Step C must be finished before step F can begin.\n' +
        'Step A must be finished before step B can begin.\n' +
        'Step A must be finished before step D can begin.\n' +
        'Step B must be finished before step E can begin.\n' +
        'Step D must be finished before step E can begin.\n' +
        'Step F must be finished before step E can begin.'

    const result = solve(input, 2, 0);

    it('Part 1', () => {
        expect(result.part1).to.equal('CABDFE');
    });

    it('Part 2', () => {
        expect(result.part2).to.equal(15);
    });
});
