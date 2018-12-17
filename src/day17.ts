class Water {
    x: number;
    y: number;
    alive: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.alive = true;
    }

    update(grid: Type[][], drops: Water[]) {
        grid[this.x][this.y] = Type.Wet;
        // TODO if stuck

        if (this.y + 1 > grid[0].length) {
            this.alive = false;
            return true;
        }

        if (this.alive) {
            if (
                grid[this.x][this.y + 1] == Type.Clay ||
                grid[this.x][this.y + 1] == Type.Water
            ) {
                this.alive = false;

                let left = true;
                let right = true;
                let leftX = 0;
                let rightX = 0;

                for (let i = 0; ; i--) {
                    leftX = this.x + i + 1;
                    if (grid[this.x + i][this.y] == Type.Clay) {
                        break;
                    } else if (
                        grid[this.x + i][this.y + 1] == Type.None ||
                        grid[this.x + i][this.y + 1] == Type.Wet
                    ) {
                        left = false;
                        break;
                    } else {
                        grid[this.x + i][this.y] = Type.Wet;
                    }
                }

                for (let i = 0; ; i++) {
                    rightX = this.x + i;
                    if (grid[this.x + i][this.y] == Type.Clay) {
                        break;
                    } else if (
                        grid[this.x + i][this.y + 1] == Type.None ||
                        grid[this.x + i][this.y + 1] == Type.Wet
                    ) {
                        right = false;
                        break;
                    } else {
                        grid[this.x + i][this.y] = Type.Wet;
                    }
                }

                if (left && right) {
                    for (let i = leftX; i < rightX; i++) {
                        grid[i][this.y] = Type.Water;
                    }
                }
                if (!left) {
                    drops.push(new Water(leftX - 1, this.y));
                }
                if (!right) {
                    drops.push(new Water(rightX, this.y));
                }
            } else {
                this.y++;
            }
        }
        return false;
    }
}

enum Type {
    None,
    Wet,
    Water,
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

    let drops: Water[] = new Array();

    let done = false;
    for (let i = 0; i < 500; i++) {
        drops.push(new Water(500 - minX + 2, 1 - minY));

        while (drops.length > 0) {
            drops.forEach(drop => {
                if(drop.update(grid, drops)) {
                    done = true;
                }
            });
            drops = drops.filter(x => x.alive);
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
