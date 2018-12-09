import { expect } from 'chai';
import 'mocha';
import { simulate } from '../src/day9';

describe('Day 9', () => {
    describe('Part 1', () => {
        it('First example', () => {
            const result = simulate(9, 25);
            expect(result).to.equal(32);
        });
        it('10 players; last marble is worth 1618 points: high score is 8317', () => {
            const result = simulate(10, 1618);
            expect(result).to.equal(8317);
        });
        it('13 players; last marble is worth 7999 points: high score is 146373', () => {
            const result = simulate(13, 7999);
            expect(result).to.equal(146373);
        });
        it('17 players; last marble is worth 1104 points: high score is 2764', () => {
            const result = simulate(17, 1104);
            expect(result).to.equal(2764);
        });
        it('21 players; last marble is worth 6111 points: high score is 54718', () => {
            const result = simulate(21, 6111);
            expect(result).to.equal(54718);
        });
        it('30 players; last marble is worth 5807 points: high score is 37305', () => {
            const result = simulate(30, 5807);
            expect(result).to.equal(37305);
        });
    });
});
