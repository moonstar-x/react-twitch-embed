/* eslint-disable no-empty-function */
export const noop = () => {};
export const typedNoop = <T>() => (_: T) => {};
export const typedNoop2 = <T1, T2>() => (_1: T1, _2: T2) => {};
