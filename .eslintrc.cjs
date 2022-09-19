module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "airbnb",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:cypress/recommended",
        "plugin:mdx/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
        "mdx/code-blocks": true,
        // optional, if you want to disable language mapper, set it to `false`
        // if you want to override the default language mapper inside, you can provide your own
        "mdx/language-mapper": {},
    },
    ignorePatterns: ["build"],
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "react/require-default-props": "off",
        "import/extensions": "off",
        "import/prefer-default-export": "off",
        quotes: ["error", "single"],
        "react/jsx-props-no-spreading": "off",
        "jsx-a11y/alt-text": "warn",
        indent: ["warn", 4],
        "react/jsx-indent": ["warn", 4],
        "react/jsx-indent-props": ["warn", 4],
        "react/jsx-filename-extension": [1, { extensions: [".tsx", ".js", ".jsx"] }],
        "object-curly-newline": "off",
        "max-len": ["warn", { code: 120 }],
        "import/no-extraneous-dependencies": "off", // All of our dependencies are in peer or dev
        "nonblock-statement-body-position": "off",
        "react/button-has-type": "off",
        "@typescript-eslint/no-empty-function": "off",
        "comma-dangle": "off", // Props were requiring a comma after
        "no-underscore-dangle": "off",
        "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true }],
        "@typescript-eslint/ban-ts-comment": "warn",
        "react/jsx-no-bind": "off",
        "react/no-unescaped-entities": "off",
    },
    overrides: [
        {
            files: ["**/__stories__/**/*.tsx", "**/__tests__/**/*.tsx"],
            rules: {
                "no-alert": "off",
                "no-console": "off",
                "react/function-component-definition": "off",
            },
        },
    ],
};
