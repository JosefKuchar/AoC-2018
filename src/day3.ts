class Area {
    id: number;
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(id: number, x: number, y: number, w: number, h: number) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

export function part1(areas: Area[]) {
    const width = 1000;
    let fabric = new Array(width * width).fill(0);

    areas.forEach(area => {
        for (let x = 0; x < area.w; x++) {
            for (let y = 0; y < area.h; y++) {
                fabric[width * (area.x + x) + (area.y + y)]++;
            }
        }
    });

    return fabric.reduce((x, y) => (y > 1 ? x + 1 : x));
}

export function part2(areas: Area[]) {
    const width = 1000;
    let fabric: number[][] = new Array(width * width);
    let areaIds = new Set();
    
    for (let i = 0; i < fabric.length; i++) {
        fabric[i] = new Array();
    }

    areas.forEach(area => {
        areaIds.add(area.id);
        for (let x = 0; x < area.w; x++) {
            for (let y = 0; y < area.h; y++) {
                let i = width * (area.x + x) + (area.y + y);
                fabric[i].push(area.id);
            }
        }
    });

    fabric.forEach(piece => {
        if (piece.length > 1) {
            piece.forEach(id => {
                areaIds.delete(id);
            });
        }
    });

    return areaIds.values().next().value;
}

export function solve(input: string) {
    // Parse input
    const areas = input
        .split("\n")
        .map(x =>
            x
                .substring(1)
                .split(/,|x|: | @/)
                .map(y => parseInt(y))
        )
        .map(x => new Area(x[0], x[1], x[2], x[3], x[4]));

    return {
        part1: part1(areas),
        part2: part2(areas)
    };
}
