function addr(i: number[], r: number[]) {
    r[i[3]] = r[i[1]] + r[i[2]];
    return r;
}

function addi(i: number[], r: number[]) {
    r[i[3]] = r[i[1]] + i[2];
    return r;
}

function mulr(i: number[], r: number[]) {
    r[i[3]] = r[i[1]] * r[i[2]];
    return r;
}

function muli(i: number[], r: number[]) {
    r[i[3]] = r[i[1]] * i[2];
    return r;
}

function banr(i: number[], r: number[]) {
    r[i[3]] = r[i[1]] & r[i[2]];
    return r;
}

function bani(i: number[], r: number[]) {
    r[i[3]] = r[i[1]] & i[2];
    return r;
}

function borr(i: number[], r: number[]) {
    r[i[3]] = r[i[1]] | r[i[2]];
    return r;
}

function bori(i: number[], r: number[]) {
    r[i[3]] = r[i[1]] | i[2];
    return r;
}

function setr(i: number[], r: number[]) {
    r[i[3]] = r[i[1]];
    return r;
}

function seti(i: number[], r: number[]) {
    r[i[3]] = i[1];
    return r;
}

function gtir(i: number[], r: number[]) {
    r[i[3]] = i[1] > r[i[2]] ? 1 : 0;
    return r;
}

function gtri(i: number[], r: number[]) {
    r[i[3]] = r[i[1]] > i[2] ? 1 : 0;
    return r;
}

function gtrr(i: number[], r: number[]) {
    r[i[3]] = r[i[1]] > r[i[2]] ? 1 : 0;
    return r;
}

function eqir(i: number[], r: number[]) {
    r[i[3]] = i[1] == r[i[2]] ? 1 : 0;
    return r;
}

function eqri(i: number[], r: number[]) {
    r[i[3]] = r[i[1]] == i[2] ? 1 : 0;
    return r;
}

function eqrr(i: number[], r: number[]) {
    r[i[3]] = r[i[1]] == r[i[2]] ? 1 : 0;
    return r;
}

function arraysEqual(a: number[], b: number[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function solve(input: string) {
    const raw = input.split('\n\n\n\n');
    const samples = raw[0].split('\n\n').map(x =>
        x.split('\n').map(y =>
            y
                .split(/[^0-9]+/)
                .filter(y => y != '')
                .map(y => parseInt(y))
        )
    );
    const program = raw[1].split('\n').map(x => x.split(' ').map(y => parseInt(y)));
    
    const opcodes = [
        addr,
        addi,
        mulr,
        muli,
        banr,
        bani,
        borr,
        bori,
        setr,
        seti,
        gtir,
        gtri,
        gtrr,
        eqir,
        eqri,
        eqrr
    ];

    let final = new Array(16).fill(0);
    let opcodeNumbers = new Array(16).fill(0).map(x => new Array(16).fill(0));

    let p1 = 0;
    samples.forEach(sample => {
        const before = sample[0];
        const instruction = sample[1];
        const after = sample[2];
        let matched = 0;

        opcodes.forEach((opcode, index) => {
            const a = opcode(instruction, [...before]);
            if (arraysEqual(a, after)) {
                matched++;
                opcodeNumbers[instruction[0]][index]++;
            }
        });

        if (matched >= 3) p1++;
    });

    for (let j = 0; j < 30; j++) {
        opcodeNumbers.forEach((numbers, index) => {
            const occurrences = numbers.reduce(
                (acc, val) => (val != 0 ? acc + 1 : acc),
                0
            );
            const index2 = numbers.reduce(
                (acc, val, i) => (val != 0 ? i : acc),
                0
            );
            if (occurrences == 1) {
                final[index] = index2;
                for (let i = 0; i < opcodeNumbers.length; i++) {
                    opcodeNumbers[i][index2] = 0;
                }
            }
        });
    }

    let registers = [0,0,0,0];
    program.forEach(line => {
        registers = opcodes[final[line[0]]](line, registers);
    });

    return {
        part1: p1,
        part2: registers[0]
    };
}
