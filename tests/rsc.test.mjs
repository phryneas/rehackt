// @ts-check
import assert from "node:assert";
import { describe, test, it } from "node:test";

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

test("Shim has the exports that React is missing", async (t) => {
  const React = await import("react");
  const Shim = await import("../rsc.js");
  for (const missingFunction of [...missingFactories, ...missingFunctions, ...missingClasses]) {
    await t.test(missingFunction, async (t) => {
      await t.test(`Shim.${missingFunction} exists`, () => {
        assert.equal(typeof Shim[missingFunction], "function");
      });
      await t.test(`Shim.default.${missingFunction} exists`, () => {
        assert.equal(typeof Shim.default[missingFunction], "function");
      });

      const implPairs = [
        { label: "named export", original: React[missingFunction], shimmed: Shim[missingFunction] },
        { label: "default export", original: React.default[missingFunction], shimmed: Shim.default[missingFunction] },
      ];

      for (const { label, original, shimmed } of implPairs) {
        if (typeof original === "function") {
          await t.test(`Doesn't shim if ${missingFunction} exists (${label})`, () => {
            assert.equal(original, shimmed);
          });
        }
      }
    });
  }
});

test("functions", async (t) => {
  const React = await import("react");
  const Shim = await import("../rsc.js");
  for (const missingFunction of missingFunctions) {
    await t.test(missingFunction, async (t) => {
      await t.test(`Shim.${missingFunction} exists`, () => {
        assert.equal(typeof Shim[missingFunction], "function");
      });
      await t.test(`Shim.default.${missingFunction} exists`, () => {
        assert.equal(typeof Shim.default[missingFunction], "function");
      });

      const implPairs = [
        { label: "named export", original: React[missingFunction], shimmed: Shim[missingFunction] },
        { label: "default export", original: React.default[missingFunction], shimmed: Shim.default[missingFunction] },
      ];

      for (const { label, original, shimmed } of implPairs) {
        if (typeof original === "function") {
          // original React impl, we don't need to test it
        } else {
          await t.test(`Shim throws when called (${label})`, () => {
            assert.throws(() => shimmed(), /is not available in this environment/);
          });
        }
      }
    });
  }
});

const describe_unlessExists = (value) => {
  if (value === undefined) {
    return describe.skip;
  } else {
    return describe;
  }
};
describe("factories", async () => {
  const React = await import("react");
  const Shim = await import("../rsc.js");

  describe_unlessExists(React.createContext)("createContext", (t) => {
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

  describe_unlessExists(React.createContext)("createFactory", (t) => {
    it("doesn't throw when creating a factory", () => {
      assert.doesNotThrow(() => Shim.createFactory("div"));
    });
    const createDiv = Shim.createFactory("div");
    test("throws when calling the factory is called", () => {
      assert.throws(() => createDiv({ children: "hello" }), /is not available in this environment/);
    });
  });
});
