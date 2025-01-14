/**
 * Utility for resolving a module relative to another module
 * @author Teddy Katz
 */

import Module from "module";

/*
 * `Module.createRequire` is added in v12.2.0. It supports URL as well.
 * We only support the case where the argument is a filepath, not a URL.
 */
const createRequire = Module.createRequire;

/**
 * Resolves a Node module relative to another module
 * @param {string} moduleName The name of a Node module, or a path to a Node module.
 * @param {string} relativeToPath An absolute path indicating the module that `moduleName` should be resolved relative to. This must be
 * a file rather than a directory, but the file need not actually exist.
 * @returns {string} The absolute path that would result from calling `require.resolve(moduleName)` in a file located at `relativeToPath`
 */
function resolve(moduleName, relativeToPath) {
    try {
        if(relativeToPath.includes('eslint-config-unmind')){
            return createRequire(relativeToPath).resolve(moduleName);
        }
        return createRequire(relativeToPath).resolve(`./node_modules/eslint-config-unmind/node_modules/${moduleName}`);
    } catch (error) {

        // This `if` block is for older Node.js than 12.0.0. We can remove this block in the future.
        if (
            typeof error === "object" &&
            error !== null &&
            error.code === "MODULE_NOT_FOUND" &&
            !error.requireStack &&
            error.message.includes(moduleName)
        ) {
            error.message += `\nRequire stack:\n- ${relativeToPath}`;
        }
        throw error;
    }
}

export {
    resolve
};
