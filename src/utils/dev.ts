import { routesNames } from "@router";
import { RouteKey, RouterContextValue } from "@router/types";

import { setAccounts } from "@store";

import { setNetwork } from "@chains/radix/store";
import { NETWORKS_LIST } from "@chains/radix/crypto";

export const log = (message: any) =>
  chrome.runtime.sendMessage({
    title: "debug-log",
    data: message,
  });

export const resetAll = async (router: RouterContextValue) => {
  setAccounts([]);
  setNetwork(NETWORKS_LIST.stokenet);
  await chrome.storage.local.set({
    masterPassword: "",
  });
  router.redirect(routesNames.SIGN_UP as RouteKey);
};
