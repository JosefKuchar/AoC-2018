import { expect } from 'chai';
import 'mocha';
import { solve } from '../src/day13';

describe('Day 13', () => {
    it('Part 1', () => {
        const input =
            '/->-\\        \n' +
            '|   |  /----\\\n' +
            '| /-+--+-\\  |\n' +
            '| | |  | v  |\n' +
            '\\-+-/  \\-+--/\n' +
            '  \\------/   ';

        const result = solve(input);
        expect(result.part1).to.equal('7,3');
    });

    it('Part 2', () => {
        const input =
            '/>-<\\  \n' +
            '|   |  \n' +
            '| /<+-\\\n' +
            '| | | v\n' +
            '\\>+</ |\n' +
            '  |   ^\n' +
            '  \\<->/';

        const result = solve(input);
        expect(result.part2).to.equal('6,4');
    });
});
