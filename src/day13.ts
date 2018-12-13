enum Direction {
    Up,
    Right,
    Down,
    Left
}

enum Track {
    None,
    Straight,
    TurnLeft,
    TurnRight,
    Intersection
}

class Cart {
    direction: Direction;
    intersections: number;
    removed: boolean;
    x: number;
    y: number;
    constructor(x: number, y: number, direction: Direction) {
        this.direction = direction;
        this.x = x;
        this.y = y;
        this.intersections = 0;
        this.removed = false;
    }

    update(grid: Track[][]) {
        switch (grid[this.x][this.y]) {
            case Track.TurnLeft:
                switch (this.direction) {
                    case Direction.Up:
                        this.direction = Direction.Left;
                        break;
                    case Direction.Down:
                        this.direction = Direction.Right;
                        break;
                    case Direction.Left:
                        this.direction = Direction.Up;
                        break;
                    case Direction.Right:
                        this.direction = Direction.Down;
                        break;
                }
                break;
            case Track.TurnRight:
                switch (this.direction) {
                    case Direction.Up:
                        this.direction = Direction.Right;
                        break;
                    case Direction.Down:
                        this.direction = Direction.Left;
                        break;
                    case Direction.Left:
                        this.direction = Direction.Down;
                        break;
                    case Direction.Right:
                        this.direction = Direction.Up;
                        break;
                }
                break;
            case Track.Intersection:
                switch (this.intersections) {
                    case 0:
                        this.direction += 3;
                        break;
                    case 2:
                        this.direction++;
                        break;
                }

                this.direction %= 4;
                this.intersections++;
                this.intersections %= 3;
        }
        switch (this.direction) {
            case Direction.Up:
                this.y--;
                break;
            case Direction.Down:
                this.y++;
                break;
            case Direction.Left:
                this.x--;
                break;
            case Direction.Right:
                this.x++;
                break;
        }
    }
}

function checkCollisions(carts: Cart[], width: number) {
    let seen = new Set();
    let collision;

    carts.forEach((cart, index) => {
        if (cart.removed == false) {
            if (seen.has(cart.x * width + cart.y)) {
                let first = carts.find(target => {
                    return target.x == cart.x && target.y == cart.y;
                });
                if (first) carts[carts.indexOf(first)].removed = true;
                carts[index].removed = true;

                collision = [cart.x, cart.y].join(',');
                return;
            } else {
                seen.add(cart.x * width + cart.y);
            }
        }
    });

    return collision;
}

export function solve(input: string) {
    const raw = input.split('\n');
    let carts = new Array();

    let grid: Track[][] = new Array(raw[0].length)
        .fill(0)
        .map(x => new Array(raw.length).fill(Track.None));

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            const char = raw[y].charAt(x);
            let type = Track.Straight;

            if (char == '^' || char == 'v' || char == '<' || char == '>') {
                let dir = Direction.Up;
                switch (char) {
                    case '^':
                        dir = Direction.Up;
                        break;
                    case 'v':
                        dir = Direction.Down;
                        break;
                    case '<':
                        dir = Direction.Left;
                        break;
                    case '>':
                        dir = Direction.Right;
                        break;
                }
                carts.push(new Cart(x, y, dir));
            } else {
                switch (char) {
                    case ' ':
                        type = Track.None;
                        break;
                    case '/':
                        type = Track.TurnRight;
                        break;
                    case '\\':
                        type = Track.TurnLeft;
                        break;
                    case '+':
                        type = Track.Intersection;
                        break;
                }
            }

            grid[x][y] = type;
        }
    }

    let crash = '';
    let firstCrash = true;
    while (carts.length > 1) {
        carts.sort((a: Cart, b: Cart) => {
            if (a.y > b.y) {
                return 1;
            } else if (a.y == b.y && a.x > b.x) {
                return 1;
            }
            return -1;
        });
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].removed == false) {
                carts[i].update(grid);
                const collision = checkCollisions(carts, grid.length);
                if (collision != undefined && firstCrash) {
                    crash = collision;
                    firstCrash = false;
                }
            }
        }

        for (let i = carts.length - 1; i >= 0; i--) {
            if (carts[i].removed) carts.splice(i, 1);
        }
    }

    return {
        part1: crash,
        part2:
            carts.length == 1
                ? carts[0].x.toString() + ',' + carts[0].y.toString()
                : ''
    };
}
