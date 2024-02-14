// @ts-check

if (0) {
  // Trick cjs-module-lexer into adding named exports for all React exports.
  // (if imported with `import()`, they will appear in `.default` as well.)
  // This way, cjs-module-lexer will let all of react's (named) exports through unchanged.
  module.exports = require("react");
}

// missing functions
module.exports.createContext = polyfillMissingFn("createContext");
module.exports.createFactory = polyfillMissingFn("createFactory");
module.exports.act = polyfillMissingFn("act");
module.exports.unstable_act = polyfillMissingFn("unstable_act");
module.exports.unstable_useCacheRefresh = polyfillMissingFn("unstable_useCacheRefresh");
module.exports.useContext = polyfillMissingFn("useContext");
module.exports.useDeferredValue = polyfillMissingFn("useDeferredValue");
module.exports.useEffect = polyfillMissingFn("useEffect");
module.exports.useImperativeHandle = polyfillMissingFn("useImperativeHandle");
module.exports.useInsertionEffect = polyfillMissingFn("useInsertionEffect");
module.exports.useLayoutEffect = polyfillMissingFn("useLayoutEffect");
module.exports.useReducer = polyfillMissingFn("useReducer");
module.exports.useRef = polyfillMissingFn("useRef");
module.exports.useState = polyfillMissingFn("useState");
module.exports.useSyncExternalStore = polyfillMissingFn("useSyncExternalStore");
module.exports.useTransition = polyfillMissingFn("useTransition");
module.exports.useOptimistic = polyfillMissingFn("useOptimistic");

// missing classes
module.exports.Component = polyfillMissingClass("Component");
module.exports.PureComponent = polyfillMissingClass("PureComponent");

module.exports.createContext = function unsupportedCreateContext() {
  return {
    Provider: function throwNoContext() {
      throw new Error("Context is not available in this environment.");
    },
    Consumer: function throwNoContext() {
      throw new Error("Context is not available in this environment.");
    },
  };
};

module.exports.createFactory = function unsupportedCreateFactory() {
  return function throwNoCreateFactory() {
    throw new Error("createFactory is not available in this environment.");
  };
};

// Here we actually pull in the React library and add everything
// it exports to our own `module.exports`.
// If React suddenly were to add one of the above "polyfilled" exports,
// the React version would overwrite our version, so this should be
// future-proof.
Object.assign(module.exports, require("react"));

function polyfillMissingFn(exportName) {
  const name = "nonExistingExport__" + exportName;
  return /** @type {any} */ (
    {
      [name]() {
        throw new Error(`React functionality '${exportName}' is not available in this environment.`);
      },
    }[name]
  );
}

function polyfillMissingClass(exportName) {
  return /** @type {any} */ (
    class NonExistentClass {
      constructor() {
        throw new Error(`React class '${exportName}' is not available in this environment.`);
      }
    }
  );
}
