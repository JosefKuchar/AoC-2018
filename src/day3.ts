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
        .split("\n") // Lines to array
        .map(x =>
            x
                .substring(1) // Remove #
                .split(/,|x|: | @/) // Extract numbers
                .map(y => parseInt(y)) // Parse strings to numbers
        )
        .map(x => new Area(x[0], x[1], x[2], x[3], x[4]));

    const width = 1000;
    let fabric: number[][] = new Array(width * width).fill(0).map(x => new Array());
    let areaIds = new Set();
    
    // Occupy fabric
    areas.forEach(area => {
        areaIds.add(area.id);
        for (let x = 0; x < area.w; x++) {
            for (let y = 0; y < area.h; y++) {
                fabric[width * (area.x + x) + (area.y + y)].push(area.id);
            }
        }
    });

    // Remove colliding IDs and count collisions
    let collisions = 0;
    fabric.forEach(piece => {
        if (piece.length > 1) {
            collisions++;
            piece.forEach(id => {
                areaIds.delete(id);
            });
        }
    });

    return { part1: collisions, part2: areaIds.values().next().value };
}
