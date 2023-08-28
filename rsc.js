// @ts-check
const React = require("react");

const GuaranteedReactExports = [
  "Children",
  "Component",
  "Fragment",
  "Profiler",
  "PureComponent",
  "StrictMode",
  "Suspense",
  "cache",
  "cloneElement",
  "createContext",
  "createElement",
  "createFactory",
  "createRef",
  "createServerContext",
  "forwardRef",
  "isValidElement",
  "lazy",
  "memo",
  "startTransition",
  "unstable_act",
  "unstable_useCacheRefresh",
  "use",
  "useCallback",
  "useContext",
  "useDebugValue",
  "useDeferredValue",
  "useEffect",
  "useId",
  "useImperativeHandle",
  "useInsertionEffect",
  "useLayoutEffect",
  "useMemo",
  "useReducer",
  "useRef",
  "useState",
  "useSyncExternalStore",
  "useTransition",
  "version",
];

const Polyfilled = {
  ...Object.fromEntries(
    Object.values(GuaranteedReactExports).map((exportName) => [
      exportName,
      function throwOnNonExistentImport() {
        throw new Error(
          `React functionality ${exportName} is not available in this environment.`
        );
      },
    ])
  ),
  // @ts-expect-error we want `createContext` to be executable in RSC
  // the created empty context object cannot be used in any meaningful way
  // but this can keep consuming libraries that create a context from
  // crashing on import
  createContext: () => ({
    Provider: function throwNoContext() {
      throw new Error("Context is not available in this environment.");
    },
    Consumer: function throwNoContext() {
      throw new Error("Context is not available in this environment.");
    },
  }),
  ...React,
};

module.exports = Polyfilled;
