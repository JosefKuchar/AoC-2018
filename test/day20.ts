import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day20';

describe('Day 20', () => {
    describe('Part 1', () => {
        it('^WNE$', () => {
            const result = solve('^WNE$');
            expect(result.part1).to.equal(10);
        });
        it('^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$', () => {
            const result = solve('^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$');
            expect(result.part1).to.equal(18);
        });
        it('^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$', () => {
            const result = solve('^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$');
            expect(result.part1).to.equal(31);
        });
    });
});
