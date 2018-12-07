import { worker } from "cluster";

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
        if (this.time <= 0 && this.index != -1) {
            return this.index;
        } else {
            return -1;
        }
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
        })

        //console.log(instructions.before);
    });

    let order = '';
    let orderSet = new Set();
    let done = false;
    while (!done) {
        for (let i = 0; i < instructions.length; i++) {
            let complete = true;
            instructions[i].before.forEach(instruction2 => {
                if (!instruction2.complete) {
                    complete = false;
                    return;
                }
            });

            if (complete && !orderSet.has(instructions[i].char)) {
                order += instructions[i].char;
                orderSet.add(instructions[i].char);
                instructions[i].complete = true;
                break;
            }
        }

        done = true;
        instructions.forEach(instruction => {
            if (!instruction.complete) {
                done = false;
                return;
            }
        });
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
            let complete = true;
            instructions[i].before.forEach(instruction2 => {
                if (!instruction2.complete) {
                    complete = false;
                    return;
                }
            });

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

        console.log(workers);

        for (let i = 0; i < workers.length; i++) {
            let result = workers[i].work();
            if (result >= 0) {
                console.log(result);
                instructions[result].complete = true;
                workers[i].reset();
            }
        }

        

        done = true;
        instructions.forEach(instruction => {
            if (!instruction.complete) {
                done = false;
                return;
            }
        });

        seconds++;
    }

    return {
        part1: order,
        part2: seconds
    }
}