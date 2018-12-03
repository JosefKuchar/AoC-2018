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

    let collisions = 0;
    fabric.forEach(piece => {
        if (piece.length > 1) collisions++;
    });

    return { part1: collisions, part2: areaIds.values().next().value };
}
