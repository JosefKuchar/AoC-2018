enum Type {
    Elf,
    Goblin
}

class Unit {
    type: Type;
    x: number;
    y: number;
    power: number;
    hp: number;

    constructor(type: Type, x: number, y: number, power = 3) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.power = power;
        this.hp = 200;
    }

    move(grid: number[][], units: Unit[]) {
        let queue = [[this.y, this.x]];
        var searchGrid = new Array(grid.length);
        for (var i = 0; i < grid.length; i++) {
            searchGrid[i] = grid[i].slice();
        }

        units.forEach(unit => {
            if (unit.type != this.type) searchGrid[unit.y][unit.x] = -3;
        });

        if (
            searchGrid[this.y - 1][this.x] == -3 ||
            searchGrid[this.y + 1][this.x] == -3 ||
            searchGrid[this.y][this.x - 1] == -3 ||
            searchGrid[this.y][this.x + 1] == -3
        )
            return;

        units.forEach(unit => {
            searchGrid[unit.y][unit.x] = -2;
        });

        // Wave algo
        searchGrid[this.y][this.x] = 0;
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

        // Find suitable cells
        let targetCells = new Array();
        units.forEach(unit => {
            if (unit.type != this.type) {
                if (
                    searchGrid[unit.y - 1][unit.x] != -2 &&
                    searchGrid[unit.y - 1][unit.x] != -1
                ) {
                    targetCells.push([unit.y - 1, unit.x]);
                }
                if (
                    searchGrid[unit.y + 1][unit.x] != -2 &&
                    searchGrid[unit.y + 1][unit.x] != -1
                ) {
                    targetCells.push([unit.y + 1, unit.x]);
                }
                if (
                    searchGrid[unit.y][unit.x - 1] != -2 &&
                    searchGrid[unit.y][unit.x - 1] != -1
                ) {
                    targetCells.push([unit.y, unit.x - 1]);
                }
                if (
                    searchGrid[unit.y][unit.x + 1] != -2 &&
                    searchGrid[unit.y][unit.x + 1] != -1
                ) {
                    targetCells.push([unit.y, unit.x + 1]);
                }
            }
        });

        //TODO: If no suitable cells
        if (targetCells.length < 1) {
            return;
        }

        // Find closest cells
        let min = targetCells.reduce(
            (acc, val) =>
                searchGrid[val[0]][val[1]] < acc
                    ? searchGrid[val[0]][val[1]]
                    : acc,
            Number.MAX_SAFE_INTEGER
        );
        targetCells = targetCells.filter(x => searchGrid[x[0]][x[1]] == min);

        // Find target by reading order
        targetCells.sort((a: number[], b: number[]) => {
            if (a[0] > b[0]) {
                return 1;
            } else if (a[0] == b[0] && a[1] > b[1]) {
                return 1;
            } else {
                return -1;
            }
        });

        for (var i = 0; i < grid.length; i++) searchGrid[i] = grid[i].slice();
        units.forEach(unit => {
            searchGrid[unit.y][unit.x] = -2;
        });

        const start = targetCells[0];
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

        min = Number.MAX_SAFE_INTEGER;
        if (
            searchGrid[this.y - 1][this.x] < min &&
            searchGrid[this.y - 1][this.x] >= 0
        ) {
            min = searchGrid[this.y - 1][this.x];
        }
        if (
            searchGrid[this.y + 1][this.x] < min &&
            searchGrid[this.y + 1][this.x] >= 0
        ) {
            min = searchGrid[this.y + 1][this.x];
        }
        if (
            searchGrid[this.y][this.x - 1] < min &&
            searchGrid[this.y][this.x - 1] >= 0
        ) {
            min = searchGrid[this.y][this.x - 1];
        }
        if (
            searchGrid[this.y][this.x + 1] < min &&
            searchGrid[this.y][this.x + 1] >= 0
        ) {
            min = searchGrid[this.y][this.x + 1];
        }

        if (searchGrid[this.y - 1][this.x] == min) {
            this.y--;
        } else if (searchGrid[this.y][this.x - 1] == min) {
            this.x--;
        } else if (searchGrid[this.y][this.x + 1] == min) {
            this.x++;
        } else if (searchGrid[this.y + 1][this.x] == min) {
            this.y++;
        }
    }

    attack(units: Unit[]) {
        let minHp = Number.MAX_SAFE_INTEGER;
        units.forEach(unit => {
            if (unit.hp < minHp) {
                if (
                    (this.x + 1 == unit.x && this.y == unit.y) ||
                    (this.x - 1 == unit.x && this.y == unit.y) ||
                    (this.x == unit.x && this.y + 1 == unit.y) ||
                    (this.x == unit.x && this.y - 1 == unit.y)
                ) {
                    minHp = unit.hp;
                }
            }
        });

        if (minHp == Number.MAX_SAFE_INTEGER) return;

        for (let i = 0; i < units.length; i++) {
            if (
                units[i].hp == minHp &&
                this.x == units[i].x &&
                this.y - 1 == units[i].y
            ) {
                units[i].hp -= this.power;
                return;
            }
        }

        for (let i = 0; i < units.length; i++) {
            if (
                units[i].hp == minHp &&
                this.x - 1 == units[i].x &&
                this.y == units[i].y
            ) {
                units[i].hp -= this.power;
                return;
            }
        }

        for (let i = 0; i < units.length; i++) {
            if (
                units[i].hp == minHp &&
                this.x + 1 == units[i].x &&
                this.y == units[i].y
            ) {
                units[i].hp -= this.power;
                return;
            }
        }

        for (let i = 0; i < units.length; i++) {
            if (
                units[i].hp == minHp &&
                this.x == units[i].x &&
                this.y + 1 == units[i].y
            ) {
                units[i].hp -= this.power;
                return;
            }
        }
    }

    update(grid: number[][], units: Unit[]) {
        this.move(grid, units);
        this.attack(units.filter(x => x.type != this.type));
    }
}

function sortUnits(a: Unit, b: Unit) {
    if (a.y > b.y) {
        return 1;
    } else if (a.y == b.y && a.x > b.x) {
        return 1;
    } else {
        return -1;
    }
}

export function solve(input: string) {
    let units: Unit[] = new Array();
    const grid: number[][] = input.split('\n').map((x, i) =>
        x.split('').map((y, j) => {
            if (y == 'E') units.push(new Unit(Type.Elf, j, i));
            else if (y == 'G') units.push(new Unit(Type.Goblin, j, i));

            if (y == '#') {
                return -2;
            } else {
                return -1;
            }
        })
    );

    let rounds = 0;
    while (true) {
        for (let j = 0; j < units.length; j++)
            if (units[j].hp > 0)
                units[j].update(grid, units.filter(x => x.hp > 0));
        units.sort(sortUnits);
        units = units.filter(x => x.hp > 0);

        if (
            !(
                units.some(x => x.type == Type.Elf) &&
                units.some(x => x.type == Type.Goblin)
            )
        ) {
            break;
        }

        rounds++;
    }

    let p1 = units.reduce((acc, val) => acc + val.hp, 0) * rounds;

    let power = 3;
    let rounds2 = 0;
    while (true) {
        units = new Array();
        input.split('\n').map((x, i) =>
            x.split('').map((y, j) => {
                if (y == 'E') units.push(new Unit(Type.Elf, j, i, power));
                else if (y == 'G') units.push(new Unit(Type.Goblin, j, i));
            })
        );

        let elves = units.reduce(
            (acc, val) => (val.type == Type.Elf ? acc + 1 : acc),
            0
        );
        rounds2 = 0;

        while (true) {
            for (let j = 0; j < units.length; j++)
                if (units[j].hp > 0)
                    units[j].update(grid, units.filter(x => x.hp > 0));
            units.sort(sortUnits);
            units = units.filter(x => x.hp > 0);

            if (
                !(
                    units.some(x => x.type == Type.Elf) &&
                    units.some(x => x.type == Type.Goblin)
                )
            ) {
                break;
            }

            rounds2++;
        }

        let elvesAfter = units.reduce(
            (acc, val) => (val.type == Type.Elf ? acc + 1 : acc),
            0
        );

        if (elvesAfter == elves) {
            break;
        } else {
            power++;
        }
    }

    let p2 = units.reduce((acc, val) => acc + val.hp, 0) * rounds2;

    return { part1: p1, part2: p2 };
}
