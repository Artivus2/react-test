const camelToSnake = (str: string) =>
    str.replace(
        /[A-Z]/g,
        letter => `_${letter.toLowerCase()}`
    );

export const camelToSnakeDTO = <X, T extends {}>(dto: T) => {
    const entries = Object
        .entries(dto)
        .map(([key, value]) => [camelToSnake(key), value]);

    return Object.fromEntries(entries) as X;
};