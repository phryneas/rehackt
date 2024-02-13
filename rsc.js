// @ts-check

// cjs-module-lexer will let all of react's (named) exports through unchanged.
module.exports = { ...require("react") };

const missingFunctions = [
  "createContext",
  "createFactory",
  "act",
  "unstable_act",
  "unstable_useCacheRefresh",
  "useContext",
  "useDeferredValue",
  "useEffect",
  "useImperativeHandle",
  "useInsertionEffect",
  "useLayoutEffect",
  "useReducer",
  "useRef",
  "useState",
  "useSyncExternalStore",
  "useTransition",
  "useOptimistic",
];

const missingClasses = ["Component", "PureComponent"];

missingFunctions.forEach((exportName) => {
  module.exports[exportName] ||= function throwOnNonExistentImport() {
    throw new Error(
      `React functionality '${exportName}' is not available in this environment.`
    );
  };
});

missingClasses.forEach((exportName) => {
  module.exports[exportName] ||= class NonExistentClass {
    constructor() {
      throw new Error(
        `React class '${exportName}' is not available in this environment.`
      );
    }
  };
});

module.exports.createContext ||= function unsupportedCreateContext() {
  return {
    Provider: function throwNoContext() {
      throw new Error("Context is not available in this environment.");
    },
    Consumer: function throwNoContext() {
      throw new Error("Context is not available in this environment.");
    },
  };
};

module.exports.createFactory ||= function unsupportedCreateFactory() {
  return function throwNoCreateFactory() {
    throw new Error("createFactory is not available in this environment.");
  };
};

// Trick cjs-module-lexer into adding named exports for these names.
// (they will appear in `.default` as well.)
// NOTE: these names need to appear verbatim, no variables or anything!
if (0) {
  const DUMMY = /** @type {any} */ (1);
  // missingFunctions
  module.exports.createContext = DUMMY;
  module.exports.createFactory = DUMMY;
  module.exports.act = DUMMY;
  module.exports.unstable_act = DUMMY;
  module.exports.unstable_useCacheRefresh = DUMMY;
  module.exports.useContext = DUMMY;
  module.exports.useDeferredValue = DUMMY;
  module.exports.useEffect = DUMMY;
  module.exports.useImperativeHandle = DUMMY;
  module.exports.useInsertionEffect = DUMMY;
  module.exports.useLayoutEffect = DUMMY;
  module.exports.useReducer = DUMMY;
  module.exports.useRef = DUMMY;
  module.exports.useState = DUMMY;
  module.exports.useSyncExternalStore = DUMMY;
  module.exports.useTransition = DUMMY;
  module.exports.useOptimistic = DUMMY;
  // missingClasses
  module.exports.Component = DUMMY;
  module.exports.PureComponent = DUMMY;
}
