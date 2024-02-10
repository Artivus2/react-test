const snakeToCamel = (str: string) =>
    str.toLowerCase().replace(
        /([-_][a-z])/g,
        group =>
            group
                .toUpperCase()
                .replace('-', '')
                .replace('_', '')
    );

export const snakeToCamelDTO = <X, T extends {}>(dto: T) => {
    const entries = Object
        .entries(dto)
        .map(([key, value]) => [snakeToCamel(key), value]);

    return Object.fromEntries(entries) as X;
};