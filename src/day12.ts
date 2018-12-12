function part1(state: boolean[], rules: boolean[][][], reserve: number) {
    for (let i = 0; i < 20; i++) {
        let newState = new Array(state.length).fill(false);
        for (let j = 2; j < state.length - 2; j++) {
            for (let a = 0; a < rules.length; a++) {
                let ok = true;

                for (let k = 0; k < 5; k++) {
                    if (rules[a][0][k] != state[j - 2 + k]) {
                        ok = false;
                        break;
                    }
                }

                if (ok == true) {
                    newState[j] = rules[a][1][0];
                    break;
                }
            }
        }
        state = newState;
    }

    let sum = 0;
    for (let i = 0; i < state.length; i++) {
        if (state[i]) {
            sum += i - reserve;
        }
    }

    return sum;
}

function part2(state: boolean[], rules: boolean[][][], reserve: number) {
    let reserve2 = 10000;
    state.unshift(...new Array(reserve2).fill(false));
    state.push(...new Array(reserve2).fill(false));
    for (let i = 0; i < 1000; i++) {
        let newState = new Array(state.length).fill(false);
        for (let j = 2; j < state.length - 2; j++) {
            for (let a = 0; a < rules.length; a++) {
                let ok = true;

                for (let k = 0; k < 5; k++) {
                    if (rules[a][0][k] != state[j - 2 + k]) {
                        ok = false;
                        break;
                    }
                }

                if (ok == true) {
                    newState[j] = rules[a][1][0];
                    break;
                }
            }
        }
        state = newState;
        
        let sum = 0;
        for (let i = 0; i < state.length; i++) {
            if (state[i]) {
                sum += i - reserve - reserve2;
            }
        }
    }

    let sum = 0;
    for (let i = 0; i < state.length; i++) {
        if (state[i]) {
            sum += i - reserve - reserve2;
        }
    }

    return (50000000000 - 1000) * 5 + sum;
}

export function solve(input: string) {
    const raw = input.split('\n\n');
    let state = raw[0]
        .substring(15)
        .split('')
        .map(x => x == '#');
    const rules = raw[1]
        .split('\n')
        .map(x => x.split(' => ').map(y => y.split('').map(z => z == '#')));

    const reserve = 20;
    state.unshift(...new Array(reserve).fill(false));
    state.push(...new Array(reserve).fill(false));

    return {
        part1: part1(state, rules, reserve),
        part2: part2(state, rules, reserve)
    };
}
