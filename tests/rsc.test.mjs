// @ts-check
import assert from "node:assert";
import { describe, test, it, skip } from "node:test";
import { version as ReactVersion } from "react";

const missingFunctions = [
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

const missingFactories = ["createContext", "createFactory"];

const missingClasses = ["Component", "PureComponent"];

describe("Shim has the exports that React is missing", async () => {
  const React = await import("react");
  const Shim = await import("../rsc.js");
  for (const missingExport of [...missingFactories, ...missingFunctions, ...missingClasses]) {
    await describe(missingExport, async () => {
      await it(`exists as a named export`, () => {
        assert.equal(typeof Shim[missingExport], "function");
      });
      await it(`exists in the default export`, () => {
        assert.equal(typeof Shim.default[missingExport], "function");
      });

      await test(`If react has it, we don't shim it (named export)`, (t) => {
        if (typeof React[missingExport] === "undefined") {
          return t.skip(becauseDoesntExist(missingExport));
        }
        assert.equal(React[missingExport], Shim[missingExport]);
      });

      await test(`If react has it, we don't shim it (default export)`, (t) => {
        if (typeof React.default[missingExport] === "undefined") {
          return t.skip(becauseDoesntExist(missingExport));
        }
        assert.equal(React.default[missingExport], Shim.default[missingExport]);
      });
    });
  }
});

describe("functions", async (t) => {
  const React = await import("react");
  const Shim = await import("../rsc.js");
  for (const missingFunction of missingFunctions) {
    await describe(missingFunction, async () => {
      await test(`Shim throws when called (named)`, (t) => {
        if (typeof React.default[missingFunction] === "function") {
          return t.skip(becauseExists(missingFunction));
        }
        assert.throws(() => Shim[missingFunction](), /is not available in this environment/);
      });

      await test(`Shim throws when called (default)`, (t) => {
        if (typeof React.default[missingFunction] === "function") {
          return t.skip(becauseExists(missingFunction));
        }
        assert.throws(() => Shim.default[missingFunction](), /is not available in this environment/);
      });
    });
  }
});

describe("factories", async () => {
  const React = await import("react");
  const Shim = await import("../rsc.js");

  describe("createContext", () => {
    if (typeof React.createContext === "function") {
      return skip(becauseExists("createContext"));
    }
    it("doesn't throw when creating a context", () => {
      assert.doesNotThrow(() => Shim.createContext());
    });
    const Ctx = Shim.createContext();
    it("throws when Ctx.Provider is used", () => {
      assert.throws(() => Ctx.Provider({ value: "whatever" }), /is not available in this environment/);
    });
    it("throws when Ctx.Consumer is used", () => {
      assert.throws(() => Ctx.Provider({ children: () => null }), /is not available in this environment/);
    });
  });

  describe("createFactory", () => {
    if (typeof React.createContext === "function") {
      return skip(becauseExists("createFactory"));
    }
    it("doesn't throw when creating a factory", () => {
      assert.doesNotThrow(() => Shim.createFactory("div"));
    });
    const createDiv = Shim.createFactory("div");
    it("throws when calling the factory is called", () => {
      assert.throws(() => createDiv({ children: "hello" }), /is not available in this environment/);
    });
  });
});

function becauseDoesntExist(name) {
  return `React doesn't export ${name} (${ReactVersion})`;
}

function becauseExists(name) {
  return `React exports ${name} (${ReactVersion})`;
}
