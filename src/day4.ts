import moment from 'moment';

enum Action {
    Begin,
    Fall,
    Wake
}

class Record {
    time: moment.Moment;
    action: Action;
    id: number;
    constructor(time: moment.Moment, action: Action, id: number) {
        this.time = time;
        this.action = action;
        this.id = id;
    }
}

export function part1(guards: number[][]) {
    const minutesAsleep = guards.map(a => a.reduce((x, y) => x + y));
    let max = 0;
    let maxId = 0;
    minutesAsleep.forEach((minutes, index) => {
        if (minutes > max) {
            max = minutes;
            maxId = index;
        }
    });

    let maxMinute = 0;
    max = 0;
    guards[maxId].forEach((minute, index) => {
        if (minute > max) {
            max = minute;
            maxMinute = index;
        }
    });

    return maxMinute * maxId;
}

export function part2(guards: number[][]) {
    let max = 0;
    let maxMinute = 0;
    let maxGuardId = 0;
    guards.forEach((minutes, guardId) => {
        minutes.forEach((frequency, minute) => {
            if (frequency > max) {
                max = frequency;
                maxMinute = minute;
                maxGuardId = guardId;
            }
        });
    });

    return maxMinute * maxGuardId;
}

export function solve(input: string) {
    // Parse into records
    let records = input
        .split('\n')
        .map(x => x.substring(1).split(/] | /))
        .map(x => {
            let action: Action = Action.Begin;
            let id = 0;
            switch (x[2]) {
                case 'Guard':
                    action = Action.Begin;
                    id = parseInt(x[3].substring(1));
                    break;
                case 'falls':
                    action = Action.Fall;
                    break;
                case 'wakes':
                    action = Action.Wake;
                    break;
            }
            return new Record(
                moment(x[0] + x[1], 'YYYY-MM-DD HH:mm'),
                action,
                id
            );
        });
    
    // Sort records by time
    records.sort((x, y) => {
        return x.time.diff(y.time) > 0 ? 1 : -1;
    });

    // Apply records
    let guards: number[][] = new Array();
    let id = 0;
    records.forEach(record => {
        if (record.action == Action.Begin) {
            id = record.id;

            // Fill guard hours if not yet
            if (guards[id] == undefined) {
                guards[id] = new Array();
                for (let i = 0; i < 60; i++) {
                    guards[id].push(0);
                }
            }
        } else {
            for (let i = record.time.minute(); i < 60; i++) {
                guards[id][i] += record.action == Action.Fall ? 1 : -1;
            }
        }
    });

    return {
        part1: part1(guards),
        part2: part2(guards)
    };
}
