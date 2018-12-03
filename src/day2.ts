export function part1(strings: string[]): number {
    let two = 0;
    let three = 0;

    strings.forEach(str => {
        // Check if string has multiple same characters
        let charCounts = Array();
        for (let i = 0; i < str.length; i++) {
            charCounts.push(0);
            for (let j = 0; j < str.length; j++) {
                if (str.charAt(i) == str.charAt(j)) {
                    charCounts[i]++;
                }
            }
        }

        if (charCounts.some(x => x == 2)) two++;
        if (charCounts.some(x => x == 3)) three++;
    });

    return two * three;
}

export function part2(strings: string[]): string {
    for (let i = 0; i < strings.length; i++) {
        for (let j = i + 1; j < strings.length; j++) {
            let errors = 0;
            let final = String();
            for (let k = 0; k < strings[0].length; k++) {
                if (strings[i].charAt(k) != strings[j].charAt(k)) {
                    errors++;
                } else {
                    final += strings[i].charAt(k);
                }
            }
            if (errors == 1) {
                return final;
            }
        }
    }
    return String();
}

export function solve(input: string) {
    let strings = input.split('\n');
    return { part1: part1(strings), part2: part2(strings) };
}
