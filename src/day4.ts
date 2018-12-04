import * as moment from 'moment';

export function solve(input: string) {
    input.split('\n');
    console.log(moment('1518-07-03 00:47', 'YYYY-MM-DD HH:mm').toDate());
    return {
        part1: 0,
	part2: 0
    };
}
