function getAllPermutations(str) {
    if (str.length === 1) return [str]

    let results = [];
    for (let i = 0; i < str.length; i++) {
        const firstChar = str[i];
        const charsLeft = str.substring(0, i) + str.substring(i + 1);
        const innerPermutations = getAllPermutations(charsLeft);
        for (let j = 0; j < innerPermutations.length; j++) {
            results.push(firstChar + innerPermutations[j]);
        }
        results = [...results, ...innerPermutations]
    }
    return [...new Set(results)]
}

const findMult_3 = (num) => {
    const m = getAllPermutations(num.toString())
        .map(Number)
        .filter(n => !(n % 3) && n)
        .sort((a, b) => a - b)
    const n = [...new Set(m)]
    console.log(n)
    return [n.length, n[n.length - 1]]
}

console.log(getAllPermutations('abc'));