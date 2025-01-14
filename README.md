# IMPORTANT NOTE
- This fork is designed to work with "eslint-config-unmind" and "unmind/eslint" only.
    - plugins are resolved in relation to "eslint-config-unmind" rather than the root of the project
      - change made to `lib/shared/relative-module-resolver`
- this will be maintained until we are able to upgrade to the new configuration file format of eslint (https://eslint.org/docs/latest/use/configure/configuration-files-new)
# ESLintRC Library

This repository contains the legacy ESLintRC configuration file format for ESLint. This package is not intended for use outside of the ESLint ecosystem. It is ESLint-specific and not intended for use in other programs.

**Note:** This package is frozen except for critical bug fixes as ESLint moves to a new config system.

## Installation

You can install the package as follows:

```
npm install @eslint/eslintrc --save-dev

# or

yarn add @eslint/eslintrc -D
```

## Usage

The primary class in this package is `FlatCompat`, which is a utility to translate ESLintRC-style configs into flat configs. Here's how you use it inside of your `eslint.config.js` file:

```js
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,                  // optional; default: process.cwd()
    resolvePluginsRelativeTo: __dirname,       // optional
    recommendedConfig: js.configs.recommended, // optional
    allConfig: js.configs.all,                 // optional
});

export default [

    // mimic ESLintRC-style extends
    ...compat.extends("standard", "example"),

    // mimic environments
    ...compat.env({
        es2020: true,
        node: true
    }),

    // mimic plugins
    ...compat.plugins("airbnb", "react"),

    // translate an entire config
    ...compat.config({
        plugins: ["airbnb", "react"],
        extends: "standard",
        env: {
            es2020: true,
            node: true
        },
        rules: {
            semi: "error"
        }
    })
];
```

## License

MIT License
