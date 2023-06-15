// @ts-check
import * as ignoreMe from 'react'

const invalidImportError = new Error("not in runtime!")

export const version = ignoreMe.version
export const Children = ignoreMe.Children
export const Component = ignoreMe.Component
export const PureComponent = ignoreMe.PureComponent
export const createElement = ignoreMe.createElement
export const cloneElement = ignoreMe.cloneElement
export const isValidElement = ignoreMe.isValidElement
export const createFactory = ignoreMe.createFactory
export const createRef = ignoreMe.createRef
export const Fragment = ignoreMe.Fragment
export const StrictMode = ignoreMe.StrictMode
export const Suspense = ignoreMe.Suspense
export const lazy = ignoreMe.lazy
export const forwardRef = ignoreMe.forwardRef
export const memo = ignoreMe.memo
export const useCallback = ignoreMe.useCallback
export const useContext = () => { throw invalidImportError }
export const useEffect = () => { throw invalidImportError }
export const useImperativeHandle = ignoreMe.useImperativeHandle
export const useDebugValue = ignoreMe.useDebugValue
export const useLayoutEffect = ignoreMe.useLayoutEffect
export const useMemo = ignoreMe.useMemo
export const useReducer = () => { throw invalidImportError }
export const useRef = () => { throw invalidImportError }
export const useState = () => { throw invalidImportError }
export const createContext = () => { throw invalidImportError }
export const useDeferredValue = ignoreMe.useDeferredValue
export const useTransition = ignoreMe.useTransition
export const startTransition = ignoreMe.startTransition
export const useId = ignoreMe.useId
export const useInsertionEffect = ignoreMe.useInsertionEffect
export const useSyncExternalStore = ignoreMe.useSyncExternalStore
export const Profiler = ignoreMe.Profiler


import * as myExports from './rsc.js'
/** @type {typeof ignoreMe} */
const check = myExports