import * as fs from 'fs';

import * as day1 from './day1';
import * as day2 from './day2';
import { isNumber } from 'util';

const days = [day1, day2]
const day = parseInt(process.argv[2]);

if (!isNumber(day) || isNaN(day) || day < 0 || day > days.length) {
    console.log("Error: You must specify valid day")
} else {
    let answer = days[day - 1].solve(readInput(day));

    console.log('Day ', day);
    console.log('Part 1: ', answer.part1);
    console.log('Part 2: ', answer.part2);

    function readInput(day: number): string {
        return fs.readFileSync('inputs/day' + day + '.txt', 'utf8');
    }
}
