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

function emulate(instructions: any[], ipRegister: number, part1: boolean) {
    let ip = 0;
    let registers = new Array(6).fill(0);
    let last = 0;
    let seen = new Set();
    while (ip < instructions.length) {
        const ins = instructions[ip];
        registers[ipRegister] = ip;
        (oppcodes as any)[ins[0]]([ins[1], ins[2], ins[3]], registers);
        ip = registers[ipRegister];
        if (ip == 28) {
            if (part1) {
                return registers[4];
            } else if (seen.has(registers[4])) {
                return last;
            } else {
                last = registers[4];
                seen.add(registers[4]);
            }
        }

        ip++;
    }

    return 0;
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
        part1: emulate(instructions, ipRegister, true),
        part2: emulate(instructions, ipRegister, false)
    };
}

/*
    // CHECK
    00 seti 123 0 4         reg[4] = 123
    01 bani 4 456 4         reg[4] &= 456
    02 eqri 4 72 4          reg[4] = reg[4] == 72
    03 addr 4 1 1           jmp reg[4]
    04 seti 0 0 1           jmp 0

    // PROGRAM
    05 seti 0 1 4           reg[4] = 0
    06 bori 4 65536 3       reg[3] = reg[4] | 65536
    07 seti 3730679 4 4     reg[4] = 3730679
    08 bani 3 255 5         reg[5] = reg[3] & 255
    09 addr 4 5 4           reg[4] += reg[5]
    10 bani 4 16777215 4    reg[4] &= 16777215
    11 muli 4 65899 4       reg[4] *= 65899
    12 bani 4 16777215 4    reg[4] &= 16777215
    13 gtir 256 3 5         reg[5] = 256 > reg[3]
    14 addr 5 1 1           jmp reg[5]
    15 addi 1 1 1           jmp 17
    16 seti 27 1 1          jmp 27
    17 seti 0 0 5           reg[5] = 0
    18 addi 5 1 2           reg[2] = reg[5] + 1
    19 muli 2 256 2         reg[2] *= 256
    20 gtrr 2 3 2           reg[2] = reg[2] > reg[3]
    21 addr 2 1 1           jmp reg[2]
    22 addi 1 1 1           jmp 24
    23 seti 25 1 1          jmp 25
    24 addi 5 1 5           reg[5]++
    25 seti 17 1 1          jmp 17
    26 setr 5 2 3           reg[3] = reg[5]
    27 seti 7 6 1           jmp 7
    28 eqrr 4 0 5           reg[5] = reg[4] == reg[0] // We can control just this
    29 addr 5 1 1           jmp reg[5] // If reg[4] == reg[0] program halts
    30 seti 5 1 1           jmp 5
*/
