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

function buildRooms(input: string) {
    let grid: Type[][] = new Array(500)
        .fill(0)
        .map(x => new Array(500).fill(Type.None));
    let posX = 250;
    let posY = 250;
    let starts = [];
    for (let i = 0; i < input.length; i++) {
        const char = input.charAt(i);
        switch (char) {
            case '(':
                starts.push([posX, posY]);
                break;
            case ')':
                let pos = starts.pop();
                if (pos) {
                    posX = pos[0];
                    posY = pos[1];
                }
                break;
            case '|':
                posX = starts[starts.length - 1][0];
                posY = starts[starts.length - 1][1];
                break;
            default:
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
        }
    }
    return grid;
}

export function part2(searchGrid: number[][]) {
    let count = 0
    for (let x = 0; x < searchGrid.length; x++) {
        for (let y = 0; y < searchGrid.length; y++) {
            if (searchGrid[x][y] >= 1999) {
                count++;
            }
        }
    }
    return count / 2 
}

export function solve(input: string) {
    let grid: Type[][] = buildRooms(input);

    const searchGrid: number[][] = grid.map(x =>
        x.map(y => (y == Type.Wall ? -2 : -1))
    );

    let queue = new Array();
    const start = [250, 250];
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
                max = searchGrid[x][y];
            }
        }
    }

    return {
        part1: max / 2,
        part2: part2(searchGrid)
    };
}
