enum Type {
    None,
    Wet,
    WaterLeft,
    WaterRight,
    Clay
}

export function solve(input: string) {
    const instructions = input.split('\n').map(x => {
        let arr: any = x.split(/[^0-9]+/).map(y => parseInt(y));
        arr[0] = x.charAt(0);
        return arr;
    });

    let minY = 0;
    let maxY = Number.MIN_SAFE_INTEGER;
    let minX = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    instructions.forEach(instruction => {
        if (instruction[0] == 'x') {
            if (instruction[1] < minX) {
                minX = instruction[1];
            }
            if (instruction[1] > maxX) {
                maxX = instruction[1];
            }
            if (instruction[2] < minY) {
                minY = instruction[2];
            }
            if (instruction[2] > maxY) {
                maxY = instruction[2];
            }
            if (instruction[3] < minY) {
                minY = instruction[3];
            }
            if (instruction[3] > maxY) {
                maxY = instruction[3];
            }
        } else {
            if (instruction[1] < minY) {
                minY = instruction[1];
            }
            if (instruction[1] > maxY) {
                maxY = instruction[1];
            }
            if (instruction[2] < minX) {
                minX = instruction[2];
            }
            if (instruction[2] > maxX) {
                maxX = instruction[2];
            }
            if (instruction[3] < minX) {
                minX = instruction[3];
            }
            if (instruction[3] > maxX) {
                maxX = instruction[3];
            }
        }
    });

    let grid = new Array(maxX - minX + 5)
        .fill(0)
        .map(x => new Array(maxY - minY + 1).fill(Type.None));

    instructions.forEach(instruction => {
        if (instruction[0] == 'x') {
            for (let i = instruction[2]; i <= instruction[3]; i++)
                grid[instruction[1] - minX + 2][i - minY] = Type.Clay;
        } else {
            for (let i = instruction[2]; i <= instruction[3]; i++)
                grid[i - minX + 2][instruction[1] - minY] = Type.Clay;
        }
    });

    for (let i = 0; i < 50000; i++) {
        grid[500 - minX + 2][1 - minY] = Type.WaterLeft;

        for (let j = 0; j < 50; j++) {
            for (let x = 1; x < grid.length - 1; x++) {
                for (let y = 0; y < grid[0].length; y++) {
                    if (
                        grid[x][y] == Type.WaterLeft ||
                        grid[x][y] == Type.WaterRight
                    ) {
                        if (y + 1 >= grid[0].length) {
                            grid[x][y] = Type.Wet;
                        } else if (grid[x][y + 1] <= Type.Wet) {
                            grid[x][y] = Type.Wet;
                            grid[x][y + 1] =
                                Math.random() < 0.5
                                    ? Type.WaterLeft
                                    : Type.WaterRight;
                        } else if (
                            grid[x - 1][y] <= Type.Wet &&
                            grid[x + 1][y] <= Type.Wet
                        ) {
                            if (grid[x][y] == Type.WaterLeft) {
                                grid[x - 1][y] = Type.WaterLeft;
                            }
                            if (grid[x][y] == Type.WaterRight) {
                                grid[x + 1][y] = Type.WaterRight;
                            }
                            grid[x][y] = Type.Wet;
                        } else if (grid[x - 1][y] <= Type.Wet) {
                            grid[x][y] = Type.Wet;
                            grid[x - 1][y] = Type.WaterLeft;
                        } else if (grid[x + 1][y] <= Type.Wet) {
                            grid[x][y] = Type.Wet;
                            grid[x + 1][y] = Type.WaterRight;
                        }
                    }
                }
            }
        }

        if (i % 100 == 0) {
            console.log(i);
        }
    }

    for (let y = 0; y < grid[0].length; y++) {
        let buffer = '';
        for (let x = 0; x < grid.length; x++) {
            switch (grid[x][y]) {
                case Type.None:
                    buffer += '.';
                    break;
                case Type.Clay:
                    buffer += '#';
                    break;
                case Type.Wet:
                    buffer += '|';
                    break;
                default:
                    buffer += '~';
            }
        }
        console.log(buffer);
    }

    return {
        part1: grid.reduce(
            (acc, val) =>
                acc +
                val.reduce(
                    (acc2, val2) =>
                        val2 > Type.None && val2 < Type.Clay ? acc2 + 1 : acc2,
                    0
                ),
            0
        ),
        part2: 0
    };
}
