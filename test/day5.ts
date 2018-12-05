import { expect } from 'chai';
import 'mocha';
import { part1, part2 } from '../src/day5';

describe('Day 5', () => {
    describe('Part 1', () => {
        it('In aA, a and A react, leaving nothing behind', () => {
            const result = part1('aA');
            expect(result).to.equal(0);
        });
        it('In abBA, bB destroys itself, leaving aA. As above, this then destroys itself, leaving nothing', () => {
            const result = part1('abBA');
            expect(result).to.equal(0);
        });
        it('In abAB, no two adjacent units are of the same type, and so nothing happens', () => {
            const result = part1('abAB');
            expect(result).to.equal(4);
        });
        it('In aabAAB, even though aa and AA are of the same type, their polarities match, and so nothing happens', () => {
            const result = part1('aabAAB');
            expect(result).to.equal(6);
        });
        it('dabAcCaCBAcCcaDA', () => {
            const result = part1('dabAcCaCBAcCcaDA');
            expect(result).to.equal(10);
        });
    });

    describe('Part 2', () => {
        it('dabAcCaCBAcCcaDA', () => {
            const result = part2('dabAcCaCBAcCcaDA');
            expect(result).to.equal(4);
        });
    });
});
