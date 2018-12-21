export function solve(input: string) {
    /*
    00 seti 123 0 4         reg[4] = 123
    01 bani 4 456 4         reg[4] |= 456
    02 eqri 4 72 4          reg[4] = reg[4] == 72
    03 addr 4 1 1           ip += reg[4]
    04 seti 0 0 1           ip = 0
    05 seti 0 1 4           reg[4] = 0
    06 bori 4 65536 3       reg[3] = reg[4] | 65536
    07 seti 3730679 4 4     reg[4] = 3730679
    08 bani 3 255 5         reg[5] = reg[3] & 255
    09 addr 4 5 4           reg[4] += reg[5]
    10 bani 4 16777215 4    reg[4] &= 16777215
    11 muli 4 65899 4       reg[4] *= 65899
    12 bani 4 16777215 4    reg[4] &= 16777215
    13 gtir 256 3 5         reg[5] = 256 > reg[3]
    14 addr 5 1 1           ip += reg[5]
    15 addi 1 1 1           ip++
    16 seti 27 1 1          ip = 27
    17 seti 0 0 5           reg[5] = 0
    18 addi 5 1 2           reg[2] = reg[5] + 1
    19 muli 2 256 2         reg[2] *= 256
    20 gtrr 2 3 2           reg[2] = reg[2] > reg[3]
    21 addr 2 1 1           ip += reg[2]
    22 addi 1 1 1           ip++
    23 seti 25 1 1          ip = 25
    24 addi 5 1 5           reg[5]++
    25 seti 17 1 1          ip = 17
    26 setr 5 2 3           reg[3] = reg[5]
    27 seti 7 6 1           ip = 7
    28 eqrr 4 0 5           reg[5] = reg[4] > reg[0] // We can control just this
    29 addr 5 1 1           ip += reg[5]
    30 seti 5 1 1           ip = 5
    */

    return {
        part1: 0,
        part2: 0
    };
}
