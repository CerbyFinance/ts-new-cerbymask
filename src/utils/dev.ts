import { DEFAULT_LOCK_TIMEOUT } from "@store";

import { setStorage } from "@chains/radix/utils";
import { DEFAULT_NETWORK } from "@chains/radix/crypto";

export const log = (message: any) =>
  chrome.runtime.sendMessage({
    title: "debug-log",
    data: message,
  });

export const resetAll = async () => {
  await setStorage({
    masterPassword: "",
    accountIndexes: {},
    autoLockTimeout: DEFAULT_LOCK_TIMEOUT,
    sessionUntil: null,
    nodes: {},
    selectedNode: null,
    keystore: null,
    selectedAddress: null,
    network: DEFAULT_NETWORK,
  });
};
