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
            node.prev = this;
            this.next.prev = node;
            node.next = this.next;
            this.next = node;
        }

        this.list.length++;
        return node;
    }

    remove() {
        this.prev.next = this.next;
        this.next.prev = this.prev;
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
}

export function simulate(playerCount: number, points: number) {
    let circle = new List();
    let players = new Array(playerCount).fill(0);
    let currentPlayer = 0;
    let currentMarble = circle.add(0);

    for (let i = 1; i <= points; i++) {
        if (i % 23 == 0) {
            players[currentPlayer] += i;
            currentMarble = currentMarble.prev.prev.prev.prev.prev.prev;
            players[currentPlayer] += currentMarble.prev.remove();
        } else {
            currentMarble = currentMarble.next.add(i);
        }

        currentPlayer++;
        currentPlayer %= playerCount;
    }

    return players.reduce((acc, x) => (x > acc ? x : acc), 0);
}

export function solve(input: string) {
    const numbers = input.split(/[a-zA-Z; ]+/).map(x => parseInt(x));

    return {
        part1: simulate(numbers[0], numbers[1]),
        part2: simulate(numbers[0], numbers[1] * 100)
    };
}
