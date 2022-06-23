module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "array-callback-return": 2,
    "no-useless-constructor": 2,
    "no-useless-rename": 2,
    "@typescript-eslint/no-explicit-any": "off",
    "max-len": [2, 120, 4, { ignoreUrls: true }],
    curly: ["error", "multi-line"],
    indent: ["error", 2, { SwitchCase: 1 }],
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    semi: [2, "always"],
    "prettier/prettier": "error",
  },
  ignorePatterns: [
    "src/shims-tsx.d.ts",
    "src/constants*",
    "src/helpers/error.helper.ts",
  ],
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
