class Instruction {
    char: string;
    complete: boolean;
    before: Instruction[];
    
    constructor(char: string) {
        this.char = char;
        this.complete = false;
        this.before = Array();
    }
}

class Worker {
    index: number;
    time: number;

    constructor() {
        this.time = 0;
        this.index = -1;
    }

    work() {
        this.time--;
        return this.time <= 0 && this.index != -1 ? this.index : -1;
    }

    reset() {
        this.time = 0;
        this.index = -1;
    }
}


export function solve(input: string, workerCount = 5, secs = 60) {

    const instructionsRaw = input
        .split('\n')
        .map(x => x.substring(5).split(/[a-z. ]+/));

    let instructionSet = new Set();

    instructionsRaw.forEach(instruction => {
        instructionSet.add(instruction[0]);
        instructionSet.add(instruction[1]);
    });

    let instructions = Array.from(instructionSet).sort().map(x => new Instruction(x));

    instructionsRaw.forEach(instruction => {
        let target = instructions.find((element) => {
            return element.char == instruction[1];
        });

        let target2 = instructions.find((element) => {
            return element.char == instruction[0];
        });

        if (target && target2) {
            target.before.push(target2);
        }
    });

    instructions.forEach((instructions, index, arr) => {
        arr[index].before = instructions.before.sort((a, b) => {
            return a > b ? 1 : -1;
        });
    });

    let order = '';
    let orderSet = new Set();
    let done = false;
    while (!done) {
        for (let i = 0; i < instructions.length; i++) {
            let complete = !instructions[i].before.some(x => x.complete == false);

            if (complete && !orderSet.has(instructions[i].char)) {
                order += instructions[i].char;
                orderSet.add(instructions[i].char);
                instructions[i].complete = true;
                break;
            }
        }

        done = !instructions.some(x => x.complete == false);
    }

    for (let i = 0; i < instructions.length; i++) {
        instructions[i].complete = false;
    }

    let seconds = 0;
    done = false;
    orderSet.clear();

    let workers = new Array(workerCount).fill(0).map(x => new Worker());

    while(!done) {
        for (let i = 0; i < instructions.length; i++) {
            let complete = !instructions[i].before.some(x => x.complete == false);

            if (complete && !orderSet.has(instructions[i].char)) {
                for(let j = 0; j < workers.length; j++) {
                    if (workers[j].index == -1) {
                        workers[j].index = i;
                        workers[j].time = secs + instructions[i].char.charCodeAt(0) - 64;
                        orderSet.add(instructions[i].char);
                        break;
                    }
                }
            }
        }

        workers.forEach(worker => {
            let result = worker.work();
            if (result >= 0) {
                instructions[result].complete = true;
                worker.reset();
            }
        });

        done = !instructions.some(x => x.complete == false);
        seconds++;
    }

    return {
        part1: order,
        part2: seconds
    }
}