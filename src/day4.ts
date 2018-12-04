import moment from "moment";

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
    let records = input
        .split("\n")
        .map(x => x.substring(1).split(/] | /))
        .map(x => {
            let action: Action = Action.Begin;
            let id = 0;
            switch (x[2]) {
                case "Guard":
                    action = Action.Begin;
                    id = parseInt(x[3].substring(1));
                    break;
                case "falls":
                    action = Action.Fall;
                    break;
                case "wakes":
                    action = Action.Wake;
                    break;
            }
            return new Record(
                moment(x[0] + x[1], "YYYY-MM-DD HH:mm"),
                action,
                id
            );
        });

    records.sort((x, y) => {
        return x.time.diff(y.time) > 0 ? 1 : -1;
    });

    let guards: number[][] = new Array();
    let id = 0;
    records.forEach(record => {
        if (record.action == Action.Begin) {
            id = record.id;

            // Fill guard hours if not yet
            if (guards[id] == undefined) {
                guards[id] = new Array();
                for (let j = 0; j < 60; j++) {
                    guards[id].push(0);
                }
            }
        } else if (record.action == Action.Fall) {
            for (let i = record.time.minute(); i < 60; i++) {
                guards[id][i]++;
            }
        } else if (record.action == Action.Wake) {
            for (let i = record.time.minute(); i < 60; i++) {
                guards[id][i]--;
            }
        }
    });

    return {
        part1: part1(guards),
        part2: part2(guards)
    };
}
