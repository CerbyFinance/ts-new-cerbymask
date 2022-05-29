import { createDomain } from "effector";

import { Currency, LockTimeout } from "@types";

const settings = createDomain();

export const $currentCurrency = settings.createStore<Currency>("usd");
export const setCurrentCurrency = settings.createEvent<Currency>();
$currentCurrency.on(setCurrentCurrency, (_, currency) => currency);

export const DEFAULT_LOCK_TIMEOUT = {
  label: "15 min",
  value: 15 * 60 * 1000,
};
export const $lockTimeout =
  settings.createStore<LockTimeout>(DEFAULT_LOCK_TIMEOUT);
export const setLockTimeout = settings.createEvent<LockTimeout>();
$lockTimeout.on(setLockTimeout, (_, timeout) => timeout);
