import { expect } from 'chai';
import 'mocha';
import { part1, part2 } from '../src/day2';

describe('Day 2', () => {
    it('Part 1', () => {
        const result = part1([
            'abcdef',
            'bababc',
            'abbcde',
            'abcccd',
            'aabcdd',
            'abcdee',
            'ababab'
        ]);
        expect(result).to.equal(12);
    });

    it('Part 2', () => {
        const result = part2([
            'abcde',
            'fghij',
            'klmno',
            'pqrst',
            'fguij',
            'axcye',
            'wvxyz'
        ]);
        expect(result).to.equal('fgij');
    });
});
