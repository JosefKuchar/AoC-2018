enum Type {
    None,
    NotSure,
    Door,
    Wall
}

function buildAround(grid: Type[][], x: number, y: number) {
    const positions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    positions.forEach(position => {
        if (grid[x + position[0]][y + position[1]] == Type.None) {
            grid[x + position[0]][y + position[1]] = Type.NotSure;
        }
    });
    return grid;
}

function getOptions(input: string) {
    let depth = 0;
    let buffer = '';
    let options = new Array();
    for (let i = 0; i < input.length; i++) {
        const char = input.charAt(i);
        switch (char) {
            case '(':
                buffer += char;
                depth++;
                break;
            case ')':
                depth--;
                buffer += char;
                break;
            case '|':
                if (depth == 0) {
                    options.push(buffer);
                    buffer = '';
                } else {
                    buffer += char;
                }
                break;
            default:
                buffer += char;
        }
    }
    options.push(buffer);
    return options;
}

function buildRooms(input: string, grid: Type[][], posX: number, posY: number) {
    const options = getOptions(input);
    if (options.length > 1) {
        options.forEach(option => {
            grid = buildRooms(option, grid, posX, posY);
        });
        return grid;
    }

    let depth = 0;
    let buffer = '';
    for (let i = 0; i < input.length; i++) {
        const char = input.charAt(i);
        switch (char) {
            case '(':
                if (depth > 0) buffer += char;
                depth++;
                break;
            case ')':
                depth--;
                if (depth == 0) {
                    //console.log(buffer);
                    //TODO: Recursion
                    buffer = '';
                } else {
                    buffer += char;
                }
                break;
            default:
                if (depth == 0) {
                    let x = 0;
                    let y = 0;
                    switch (char) {
                        case 'N':
                            y--;
                            break;
                        case 'S':
                            y++;
                            break;
                        case 'E':
                            x++;
                            break;
                        case 'W':
                            x--;
                            break;
                    }
                    grid[posX + x][posY + y] = Type.Door;
                    grid = buildAround(grid, posX, posY);
                    posX += x * 2;
                    posY += y * 2;
                    grid = buildAround(grid, posX, posY);
                } else {
                    buffer += char;
                }
        }
    }
    return grid;
}

export function solve(input: string) {
    let grid: Type[][] = new Array(20)
        .fill(0)
        .map(x => new Array(20).fill(Type.None));
    buildRooms(input.substring(1, input.length - 1), grid, 10, 10);

    for (let y = 0; y < grid[0].length; y++) {
        let buffer = '';
        for (let x = 0; x < grid.length; x++) {
            switch(grid[x][y]) {
                case Type.None:
                    buffer += '.'
                    break;
                case Type.NotSure:
                    buffer += '?'
                    break;
                case Type.Door:
                    buffer += '-'
                    break;
                case Type.Wall:
                    buffer += '#'
            }
        }
        console.log(buffer);
    }

    console.log(getOptions('NEEE|'));

    return {
        part1: 0,
        part2: 0
    };
}
