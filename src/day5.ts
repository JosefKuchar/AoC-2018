export function part1(input: string) {
    let buffer = input;
    let newBuffer = '';
    let done = false;

    while (!done) {
        done = true;
        for (let i = 0; i < buffer.length; i++) {
            if (
                i != buffer.length - 1 &&
                Math.abs(buffer.charCodeAt(i) - buffer.charCodeAt(i + 1)) == 32
            ) {
                i++;
                done = false;
            } else {
                newBuffer += buffer.charAt(i);
            }
        }
        buffer = (' ' + newBuffer).slice(1);
        newBuffer = '';
    }

    return buffer.length;
}

export function part2(input: string) {
    let min = Number.MAX_SAFE_INTEGER;
    for (let j = 65; j <= 90; j++) {
        let buffer = '';
        for (let i = 0; i < input.length; i++) {
            if (input.charCodeAt(i) != j && input.charCodeAt(i) != j + 32) {
                buffer += input.charAt(i);
            }
        }
        let len = part1(buffer);
        if (len < min) {
            min = len;
        }
    }
    return min;
}

export function solve(input: string) {
    return {
        part1: part1(input),
        part2: part2(input)
    };
}
