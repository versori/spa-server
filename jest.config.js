module.exports = {
    roots: ['./src'],
    moduleFileExtensions: ['ts', 'js'],
    testPathIgnorePatterns: ['node_modules/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['**/*.test.(ts|tsx)'],
    globals: {
        window: {},
    },
};
