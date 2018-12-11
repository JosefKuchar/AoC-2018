import { expect } from 'chai';
import 'mocha';
import { getPowerLevel, solve } from '../src/day11';

describe('Day 11', () => {
    describe('Power level', () => {
        it('Fuel cell at 3,5 in a grid with serial number 8: power level 4', () => {
            const result = getPowerLevel(3, 5, 8);
            expect(result).to.equal(4);
        });
        it('Fuel cell at 122,79, grid serial number 57: power level -5', () => {
            const result = getPowerLevel(122, 79, 57);
            expect(result).to.equal(-5);
        });
        it('Fuel cell at 217,196, grid serial number 39: power level  0', () => {
            const result = getPowerLevel(217, 196, 39);
            expect(result).to.equal(0);
        });
        it('Fuel cell at 101,153, grid serial number 71: power level  4', () => {
            const result = getPowerLevel(101, 153, 71);
            expect(result).to.equal(4);
        });
    });
});
