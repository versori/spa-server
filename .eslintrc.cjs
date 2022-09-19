module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    ignorePatterns: ['build'],
    plugins: ['@typescript-eslint'],
    rules: {
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        quotes: ['error', 'single'],
        indent: ['warn', 4],
        'object-curly-newline': 'off',
        'max-len': ['warn', { code: 120 }],
        'import/no-extraneous-dependencies': 'off', // All of our dependencies are in peer or dev
        'nonblock-statement-body-position': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'comma-dangle': 'off', // Props were requiring a comma after
        'no-underscore-dangle': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
        '@typescript-eslint/ban-ts-comment': 'warn',
    },
};
