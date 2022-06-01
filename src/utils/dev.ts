import { routesNames } from "@router";
import { RouteKey, RouterContextValue } from "@router/types";

import { setStorage } from "@chains/radix/utils";

export const log = (message: any) =>
  chrome.runtime.sendMessage({
    title: "debug-log",
    data: message,
  });

export const resetAll = async (router: RouterContextValue) => {
  await setStorage({
    masterPassword: "",
    accountIndexes: {},
    sessionUntil: null,
    nodes: {},
    selectedNode: null,
    keystore: null,
  });
  router.redirect(routesNames.SIGN_UP as RouteKey);
};
