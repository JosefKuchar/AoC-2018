class Point {
    posX: number
    posY: number
    velX: number
    velY: number

    constructor(posX: number, posY: number, velX: number, velY: number) {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
    }

    update() {
        this.posX += this.velX;
        this.posY += this.velY;
    }
}

export function solve(input: string) {
    const numbers = input.split('\n').map(x =>
        x
            .split(/[^0-9\-]+/)
            .filter(x => x != '')
            .map(x => parseInt(x))
    );

    let points = numbers.map(x => new Point(x[0], x[1], x[2], x[3]));
    
    let done = false;
    let s = 0;
    while (!done) {
        points.forEach(point => {
            point.update();
        });

        let xs: number[][] = new Array();
        points.forEach(point => {
            if (!xs[point.posX + 60000])
                xs[point.posX + 60000] = new Array()
            xs[point.posX + 60000].push(point.posY);
        });

        xs.map(x => x.sort());

        xs.forEach(x => {
            let lastY: number | undefined = undefined;
            let strike = 1;
            x.forEach(y => {
                if (lastY == undefined) {
                    strike = 1
                } else if ( y - 1 === lastY)
                    strike++;
                else {
                    strike = 0;
                }

                if (strike >= 5) {
                    done = true;
                }

                lastY = y;
            });
        });

        s++;
    }

    let minX = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;

    points.forEach(point => {
        if (point.posX < minX) {
            minX = point.posX
        }
        if (point.posX > maxX) {
            maxX = point.posX;
        }
        if (point.posY < minY) {
            minY = point.posY;
        }
        if (point.posY > maxY) {
            maxY = point.posY;
        }
    });

    let grid: string[][] = new Array(maxY - minY + 1)
        .fill(0)
        .map(x => new Array(maxX - minX + 1).fill('.'));

    points.forEach(point => {
        grid[point.posY - minY][point.posX - minX] = '#'; 
    });

    let buffer = '\n'
    grid.forEach(row => {
        buffer += row.reduce((acc, x) => acc + x, '') + '\n'
    })

    return {
        part1: buffer,
        part2: s
    };
}