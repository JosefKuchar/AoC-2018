function distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function closest(coordinates: number[][], x: number, y: number) {
    let min = Number.MAX_SAFE_INTEGER;
    let minIndex = 0;
    let multiple = false;
    coordinates.forEach((coordinate, index) => {
        const dst = distance(x, y, coordinate[0], coordinate[1]);
        if (dst < min) {
            min = dst;
            minIndex = index;
            multiple = false;
        } else if (dst == min) {
            multiple = true;
        }
    });

    return multiple ? -1 : minIndex;
}

function part1(coordinates: number[][]) {
    const size = 500;
    let grid: number[][] = new Array(size)
        .fill(0)
        .map(x => new Array(size).fill(-1));
    let finite = new Set();

    for (let i = 0; i < coordinates.length; i++) {
        finite.add(i);
    }

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            grid[x][y] = closest(coordinates, x, y);
        }
    }

    for (let i = 0; i < size; i++) {
        finite.delete(closest(coordinates, i, 0));
        finite.delete(closest(coordinates, i, size));
        finite.delete(closest(coordinates, 0, i));
        finite.delete(closest(coordinates, size, i));
    }

    let areas = new Array();

    finite.forEach(num => {
        areas[num] = 0;
    });

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            finite.forEach(num => {
                if (grid[x][y] == num) areas[num]++;
            });
        }
    }

    return areas.reduce((acc, val) => (val > acc ? acc = val : acc));
}

function part2(coordinates: number[][], lessThan: number) {
    let total = 0;
    for (let x = 0; x < 500; x++) {
        for (let y = 0; y < 500; y++) {
            let dst = coordinates.reduce((acc, val) => distance(x, y, val[0], val[1]) + acc, 0);
            if (dst < lessThan) total++;
        }
    }
    return total;
}

export function solve(input: string, lessThan: number = 10000) {
    let coordinates = input
        .split('\n')
        .map(x => x.split(', ').map(y => parseInt(y)));
    return {
        part1: part1(coordinates),
        part2: part2(coordinates, lessThan)
    };
}
