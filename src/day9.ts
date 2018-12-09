class Node {
    prev: Node;
    next: Node;
    data: number;
    private list: List;

    constructor(data: number, list: List) {
        this.data = data;
        this.list = list;
        this.next = this;
        this.prev = this;
    }

    add(num: number) {
        let node = new Node(num, this.list);

        if (this.list.length == 1) {
            this.next = node;
            this.prev = node;
            node.next = this;
            node.prev = this;
        } else {
            let next = this.next;
            node.prev = this;
            next.prev = node;
            node.next = next;
            this.next = node;
        }

        this.list.length++;

        return node;
    }

    remove() {
        let prev = this.prev;
        let next = this.next;

        prev.next = next;
        next.prev = prev;

        this.list.length--;

        return this.data;
    }
}

class List {
    head: Node;
    length: number;

    constructor() {
        this.length = 0;
        this.head = new Node(0, this);
    }

    add(num: number) {
        this.head = new Node(num, this);
        this.head.prev = this.head;
        this.head.next = this.head;
        this.length++;
        
        return this.head;
    }

    toString() {
        let buffer = ''
        let current = this.head;
        for (let i = 0; i < this.length; i++) {
            buffer += current.data.toString() + ' '
            current = current.next;
        }
        return buffer;
    }
}

export function part1(playerCount: number, points: number) {
    let circle = new List();
    
    let players = new Array(playerCount).fill(0);
    let currentPlayer = 0;
    let currentMarbleNumber = 1;
    let currentMarble = circle.add(0);

    for (let i = 0; i < points; i++) {
        if (currentMarbleNumber % 23 == 0) {
            players[currentPlayer] += currentMarbleNumber;
            currentMarble = currentMarble.prev.prev.prev.prev.prev.prev;
            players[currentPlayer] += currentMarble.prev.remove();
        } else {
            currentMarble = currentMarble.next.add(currentMarbleNumber);
        }

        currentMarbleNumber++;
        currentPlayer++;
        currentPlayer %= playerCount;
    }
    
    return players.reduce((acc, x) => x > acc ? x : acc, 0);
}

export function solve(input: string) {
    const numbers = input.split(/[a-zA-Z; ]+/).map(x => parseInt(x));

    return {
        part1: part1(numbers[0], numbers[1]),
        part2: part1(numbers[0], numbers[1] * 100)
    };
}
