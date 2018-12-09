export function part1(playerCount: number, points: number) {
    let players = new Array(playerCount).fill(0);
    let currentPlayer = 0;
    let currentMarbleIndex = 0;
    let currentMarble = 1;
    let circle = [0];

    for (let i = 0; i < points; i++) {
        if (currentMarble % 23 == 0) {
            players[currentPlayer] += currentMarble;
            players[currentPlayer] += circle.splice(currentMarbleIndex - 7, 1)[0];
            currentMarbleIndex -= 7;

            if (currentMarbleIndex < 0) {
                currentMarbleIndex += circle.length + 1;
            }
        } else {
            if (currentMarbleIndex + 1 >= circle.length) {
                circle.splice(1, 0, currentMarble);
                currentMarbleIndex = 1
            } else {
                circle.splice(currentMarbleIndex + 2, 0, currentMarble);
                currentMarbleIndex += 2;
            }
        }

        currentMarble++;
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
    }
}