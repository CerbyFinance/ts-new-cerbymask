import { createDomain, forward } from "effector";

import { Currency, LockTimeout } from "@types";
import { activateSession, setStorage } from "@chains/radix/utils";

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
export const setLockTimeoutFx = settings.createEffect(
  async (timeout: LockTimeout) => {
    await setStorage({ autoLockTimeout: timeout });
    await activateSession();
    return timeout;
  }
);
$lockTimeout.on(setLockTimeout, (_, timeout) => timeout);

forward({
  from: setLockTimeout,
  to: setLockTimeoutFx,
});
