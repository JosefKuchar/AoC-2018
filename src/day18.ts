enum Type {
    Open,
    Trees,
    Lumberyard
}

function update(grid: Type[][]) {
    let newGrid = new Array(grid.length)
        .fill(0)
        .map(x => new Array(grid[0].length).fill(Type.Open));
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            let materials = new Array();
            for (let xx = -1; xx <= 1; xx++) {
                for (let yy = -1; yy <= 1; yy++) {
                    if (
                        (xx != 0 || yy != 0) &&
                        x + xx >= 0 &&
                        x + xx < grid.length &&
                        y + yy >= 0 &&
                        y + yy < grid[0].length
                    )
                        materials.push(grid[x + xx][y + yy]);
                }
            }
            switch (grid[x][y]) {
                case Type.Open:
                    newGrid[x][y] =
                        materials.reduce(
                            (acc, val) => (val == Type.Trees ? acc + 1 : acc),
                            0
                        ) >= 3
                            ? Type.Trees
                            : Type.Open;
                    break;
                case Type.Trees:
                    newGrid[x][y] =
                        materials.reduce(
                            (acc, val) =>
                                val == Type.Lumberyard ? acc + 1 : acc,
                            0
                        ) >= 3
                            ? Type.Lumberyard
                            : Type.Trees;
                    break;
                case Type.Lumberyard:
                    const lumberyards = materials.reduce(
                        (acc, val) => (val == Type.Lumberyard ? acc + 1 : acc),
                        0
                    );
                    const trees = materials.reduce(
                        (acc, val) => (val == Type.Trees ? acc + 1 : acc),
                        0
                    );
                    newGrid[x][y] =
                        lumberyards >= 1 && trees >= 1
                            ? Type.Lumberyard
                            : Type.Open;
                    break;
            }
        }
    }
    return newGrid;
}

function count(grid: Type[][]) {
    let trees = 0;
    let lumberyards = 0;
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            if (grid[x][y] == Type.Trees) trees++;
            else if (grid[x][y] == Type.Lumberyard) lumberyards++;
        }
    }

    return trees * lumberyards;
}

export function solve(input: string) {
    let grid: Type[][] = input.split('\n').map(x =>
        x.split('').map(y => {
            switch (y) {
                case '|':
                    return Type.Trees;
                case '#':
                    return Type.Lumberyard;
                default:
                    return Type.Open;
            }
        })
    );

    for (let i = 0; i < 10; i++) {
        grid = update(grid);
    }

    let p1 = count(grid);

    // Get stable grid
    for (let i = 0; i < 1980; i++) {
        grid = update(grid);
    }

    // Find cycle
    let last = 0;
    let lastDiff = 0;
    for (let i = 0; i < 10; i++) {
        grid = update(grid);
        const now = count(grid);
        lastDiff = last - now;
        last = now;
    }

    let lastDiff2 = 0;
    let cycle = 0;
    for (let i = 0; ; i++) {
        grid = update(grid);
        const now = count(grid);
        lastDiff2 = last - now;
        last = now;

        if (lastDiff == lastDiff2) {
            cycle = i + 1;
            break;
        }
    }

    let left = (1000000000 - 2000 - cycle) % cycle;

    for (let i = 0; i < left; i++) grid = update(grid);

    return { part1: p1, part2: count(grid) };
}
