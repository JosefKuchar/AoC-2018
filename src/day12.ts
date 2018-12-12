function step(state: boolean[], rules: boolean[][][]) {
    let newState = new Array(state.length).fill(false);
    for (let j = 2; j < state.length - 2; j++) {
        for (let rule of rules) {
            let ok = true;

            for (let k = 0; k < 5; k++) {
                if (rule[0][k] != state[j - 2 + k]) {
                    ok = false;
                    break;
                }
            }

            if (ok == true) {
                newState[j] = rule[1][0];
                break;
            }
        }
    }
    return newState;
}

function part1(state: boolean[], rules: boolean[][][]) {
    const reserve = 20;
    state.unshift(...new Array(reserve).fill(false));
    state.push(...new Array(reserve).fill(false));
    for (let i = 0; i < 20; i++) {
        state = step(state, rules);
    }

    return state.reduce((acc, val, i) => val ? acc + i - reserve : acc, 0);
}

function part2(state: boolean[], rules: boolean[][][]) {
    let reserve = 2000;

    state.unshift(...new Array(reserve).fill(false));
    state.push(...new Array(reserve).fill(false));

    for (let i = 0; i < 999; i++) {
        state = step(state, rules);
    }

    let sum = state.reduce((acc, val, i) => (val ? acc + i - reserve : acc), 0);
    state = step(state, rules);
    let sum2 = state.reduce((acc, val, i) => (val ? acc + i - reserve : acc), 0);

    return (50000000000 - 1000) * (sum2 - sum) + sum2;
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

    return {
        part1: part1([...state], rules),
        part2: part2(state, rules)
    };
}
