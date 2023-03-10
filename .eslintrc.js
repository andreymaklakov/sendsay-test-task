module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    indent: [0, 2],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" },
    ],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    semi: [2, "always"],
    "multiline-ternary": ["off"],
    "react/display-name": ["off"],
  },
};
