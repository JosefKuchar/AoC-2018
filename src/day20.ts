enum Type {
    None,
    Door,
    Wall
}

function buildAround(grid: Type[][], posX: number, posY: number) {
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if ((x != 0 || y != 0) && grid[x + posX][y + posY] == Type.None) {
                grid[x + posX][y + posY] = Type.Wall;
            }
        }
    }
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

function generateNewPaths(paths: string[], add: string[]) {
    let newPaths = new Array();
    paths.forEach(path => {
        add.forEach(addPath => {
            newPaths.push(path + addPath);
        });
    });
    return newPaths;
}

function buildPaths(input: string) {
    const options = getOptions(input);
    let paths: string[] = new Array();
    if (options.length > 1) {
        for (let i = 0; i < options.length; i++)
            paths.push(...buildPaths(options[i]));
        return paths;
    }

    paths.push('');
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
                    paths = generateNewPaths(paths, buildPaths(buffer));
                    buffer = '';
                } else {
                    buffer += char;
                }
                break;
            default:
                if (depth == 0) {
                    for (let i = 0; i < paths.length; i++) {
                        paths[i] += char;
                    }
                } else {
                    buffer += char;
                }
        }
    }

    return paths;
}

function buildRooms(paths: string[]) {
    let grid: Type[][] = new Array(200)
        .fill(0)
        .map(x => new Array(200).fill(Type.None));
    paths.forEach(path => {
        let posX = 100;
        let posY = 100;

        for (let i = 0; i < path.length; i++) {
            let x = 0;
            let y = 0;
            switch (path.charAt(i)) {
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
        }
    });
    return grid;
}

export function solve(input: string) {
    const paths = buildPaths(input.substring(1, input.length - 1));
    const grid = buildRooms(paths);
    const searchGrid: number[][] = grid.map(x => x.map(y => y == Type.Wall ? -2 : -1));
    
    let queue = new Array();
    const start = [100, 100];
    queue.push(start);
    searchGrid[start[0]][start[1]] = 0;
    while (queue.length > 0) {
        let current = queue.shift();
        if (current == undefined) break;
        let val = searchGrid[current[0]][current[1]];
        if (searchGrid[current[0] - 1][current[1]] == -1) {
            queue.push([current[0] - 1, current[1]]);
            searchGrid[current[0] - 1][current[1]] = val + 1;
        }
        if (searchGrid[current[0] + 1][current[1]] == -1) {
            queue.push([current[0] + 1, current[1]]);
            searchGrid[current[0] + 1][current[1]] = val + 1;
        }
        if (searchGrid[current[0]][current[1] - 1] == -1) {
            queue.push([current[0], current[1] - 1]);
            searchGrid[current[0]][current[1] - 1] = val + 1;
        }
        if (searchGrid[current[0]][current[1] + 1] == -1) {
            queue.push([current[0], current[1] + 1]);
            searchGrid[current[0]][current[1] + 1] = val + 1;
        }
    }

    let max = 0;
    for (let x = 0; x < searchGrid.length; x++) {
        for (let y = 0; y < searchGrid.length; y++) {
            if (searchGrid[x][y] > max) {
                max = searchGrid[x][y]
            }
        }
    }
    
    for (let y = 0; y < grid[0].length; y++) {
        let buffer = '';
        for (let x = 0; x < grid.length; x++) {
            switch(grid[x][y]) {
                case Type.None:
                    buffer += '.'
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

    console.log('test');

    return {
        part1: max / 2,
        part2: 0
    };
}
