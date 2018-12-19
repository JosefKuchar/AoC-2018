function emulate(regVal: number) {
    let a = 976 + regVal * 10550400;
    let sqrt = Math.floor(Math.sqrt(a));
    let b = 0;
    for (let i = 1; i < sqrt; i++) {
        if (a % i == 0) {
            b += i + Math.floor(a / i);
        }
    }

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

    return b;
}

export function solve(input: string) {

    return { part1: emulate(0), part2: emulate(1) };
}
