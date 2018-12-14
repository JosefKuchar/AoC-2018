import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day14';

describe('Day 14', () => {
    describe('Part 1', () => {
        it('After 9 recipes, the scores of the next ten would be 5158916779', () => {
            const result = solve('9');
            expect(result.part1).to.equal('5158916779');
        });
        it('After 18 recipes, the scores of the next ten would be 9251071085', () => {
            const result = solve('18');
            expect(result.part1).to.equal('9251071085');
        });
        it('After 2018 recipes, the scores of the next ten would be 5941429882', () => {
            const result = solve('2018');
            expect(result.part1).to.equal('5941429882');
        });
    });

    describe('Part 2', () => {
        it('51589 first appears after 9 recipes', () => {
            const result = solve('51589');
            expect(result.part2).to.equal(9);
        });
        it('92510 first appears after 18 recipes', () => {
            const result = solve('92510');
            expect(result.part2).to.equal(18);
        });
        it('59414 first appears after 2018 recipes', () => {
            const result = solve('59414');
            expect(result.part2).to.equal(2018);
        });
    });
});
