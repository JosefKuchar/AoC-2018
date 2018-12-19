let oppcodes = {
    addr: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]] + r[i[1]];
        return r;
    },
    addi: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]] + i[1];
        return r;
    },
    mulr: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]] * r[i[1]];
        return r;
    },
    muli: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]] * i[1];
        return r;
    },
    banr: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]] & r[i[1]];
        return r;
    },
    bani: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]] & i[1];
        return r;
    },
    borr: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]] | r[i[1]];
        return r;
    },
    bori: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]] | i[1];
        return r;
    },
    setr: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]];
        return r;
    },
    seti: (i: number[], r: number[]) => {
        r[i[2]] = i[0];
        return r;
    },
    gtir: (i: number[], r: number[]) => {
        r[i[2]] = i[0] > r[i[1]] ? 1 : 0;
        return r;
    },
    gtri: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]] > i[1] ? 1 : 0;
        return r;
    },
    gtrr: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]] > r[i[1]] ? 1 : 0;
        return r;
    },
    eqir: (i: number[], r: number[]) => {
        r[i[2]] = i[0] == r[i[1]] ? 1 : 0;
        return r;
    },
    eqri: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]] == i[1] ? 1 : 0;
        return r;
    },
    eqrr: (i: number[], r: number[]) => {
        r[i[2]] = r[i[0]] == r[i[1]] ? 1 : 0;
        return r;
    }
};

function emulate(instructions: any[], ipRegister: number, regVal: number) {
    let ip = 0;
    let registers = new Array(6).fill(0);
    registers[0] = regVal;

    let hack1 = true;
    let hack2 = true;

    while (ip < instructions.length) {
        const ins = instructions[ip];
        registers[ipRegister] = ip;
        (oppcodes as any)[ins[0]]([ins[1], ins[2], ins[3]], registers);
        ip = registers[ipRegister];
        ip++;

        /*
        17 addi 2 2 2 reg[2] += 2
        18 mulr 2 2 2 reg[2] *= 2
        19 mulr 4 2 2 reg[2] *= 19
        20 muli 2 11 2 reg[2] *= 11
        21 addi 3 6 3 reg[3] += 6
        22 mulr 3 4 3 reg[3] *= 22
        23 addi 3 8 3 reg[3] += 8
        24 addr 2 3 2 reg[2] += reg[1]
        25 addr 4 0 4 ip += reg[0]
        26 seti 0 1 4 ip = 0

        2 * 2 * 19 * 11 + 6 * 22 + 8 => 976

        27 setr 4 4 3 reg[3] = 27
        28 mulr 3 4 3 reg[3] *= 28
        29 addr 4 3 3 reg[3] += 29
        30 mulr 4 3 3 reg[3] *= 30
        31 muli 3 14 3 reg[3] *= 14
        32 mulr 3 4 3 reg[3] *= 32
        33 addr 2 3 2 reg[2] += reg[3]
        34 seti 0 4 0
        35 seti 0 7 4

        (27 * 28 + 29) * 30 * 14 * 32 => 10550400
        */

        if (regVal == 1) console.log(registers);
    }

    return registers[0];
}

export function solve(input: string) {
    let lines = input.split('\n');
    let ipRegisterString = lines.shift();
    const instructions = lines.map(x =>
        x.split(' ').map((y, index) => (index == 0 ? y : parseInt(y)))
    );
    let ipRegister = 0;
    if (ipRegisterString) {
        ipRegister = parseInt(ipRegisterString.split(' ')[1]);
    }

    return {
        part1: emulate(instructions, ipRegister, 0),
        part2: emulate(instructions, ipRegister, 1)
    };
}
