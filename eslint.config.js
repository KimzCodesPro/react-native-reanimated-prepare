// https://docs.expo.dev/guides/using-eslint/
// ⚠️ WARNING: DO NOT MODIFY THIS FILE WITHOUT TEAM LEAD APPROVAL
// This ESLint configuration enforces team coding standards.
// Any changes must be reviewed and approved by the team lead.
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const reactNative = require("eslint-plugin-react-native");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      "react-native": reactNative,
    },
    ignores: ["dist/*", "src/plugins/*"],
    rules: {
      // Warn when a useEffect/useMemo/useCallback dependency array is missing values it references.
      "react-hooks/exhaustive-deps": "warn",
      // Enforce the Rules of Hooks: only call hooks at the top level and from React functions.
      "react-hooks/rules-of-hooks": "error",
      // Disallow inline `style={{...}}` props; use StyleSheet.create for performance and consistency.
      "react-native/no-inline-styles": "error",
      // Off: flags forwardRef components assigned to a const with an anonymous
      // arrow function, even though the const name is a valid display name.
      "react/display-name": "off",
      // Disallow importing from certain restricted paths -> @/src directly.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/src", "@/src/*"],
              message:
                "Use '@/components', '@/utils', etc. instead of '@/src/...'.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      // Warn on unused variables. Args prefixed with `_` are ignored (e.g. `_event`),
      // and unused `catch` error bindings are allowed.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          caughtErrors: "none",
        },
      ],
      // Require `type` over `interface` for type definitions to keep the codebase consistent.
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],

      // Naming conventions from our code policy:
      // - All type-like declarations (types, interfaces, enums, classes) must be PascalCase.
      // - Component prop type aliases must end with the `Props` suffix (e.g. `ButtonProps`).
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "typeAlias",
          filter: {
            regex: "Props$",
            match: true,
          },
          format: ["PascalCase"],
          suffix: ["Props"],
        },
      ],
    },
  },
]);
