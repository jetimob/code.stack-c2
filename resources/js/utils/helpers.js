export const deterministicRandomForN = (input, N) => {
    if (
        typeof input !== 'number' ||
        typeof N !== 'number' ||
        N < 1 ||
        !Number.isInteger(N)
    ) {
        throw new Error(
            'Input must be a number and N must be a positive integer'
        );
    }

    let hash = 0;
    const inputStr = input.toString();
    for (let i = 0; i < inputStr.length; i++) {
        const char = inputStr.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }

    return Math.abs(hash % N) + 1;
};
