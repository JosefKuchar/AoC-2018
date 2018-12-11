export function getPowerLevel(x: number, y: number, serial: number) {
    let id = x + 10;
    let power = id * y;
    power += serial;
    power *= id;
    power = Math.floor(power / 100) % 10;
    return power - 5;
}

export function part1(grid: number[][]) {
    let max = Number.MIN_SAFE_INTEGER;
    let coords = [0, 0];
    for (let x = 0; x < 298; x++) {
        for (let y = 0; y < 298; y++) {
            let sum = 0;
            for (let x2 = 0; x2 < 3; x2++) {
                for (let y2 = 0; y2 < 3; y2++) {
                    sum += grid[x + x2][y + y2];
                }
            }
            if (sum > max) {
                max = sum;
                coords = [x + 1, y + 1];
            }
        }
    }

    return coords.join(',');
}

export function part2(grid: number[][]) {
    let max = Number.MIN_SAFE_INTEGER;
    let coords = [0, 0, 0];

    for (let size = 1; size < 300; size++) {
        for (let x = 0; x < 300 - size + 1; x++) {
            for (let y = 0; y < 300 - size + 1; y++) {
                let sum = 0;
                for (let x2 = 0; x2 < size; x2++) {
                    for (let y2 = 0; y2 < size; y2++) {
                        sum += grid[x + x2][y + y2];
                    }
                }
                if (sum > max) {
                    max = sum;
                    coords = [x + 1, y + 1, size];
                }
            }
        }
    }

    return coords.join(',');
}


export function solve(input: string) {
    let serial = parseInt(input);

    let grid: number[][] = new Array(300)
        .fill(0)
        .map(x => new Array(300).fill(0));
    
    for (let x = 0; x < 300; x++) {
        for (let y = 0; y < 300; y++) {
            grid[x][y] = getPowerLevel(x + 1, y + 1, serial);
        }
    }

    return {
        part1: part1(grid),
        part2: part2(grid)
    }
}