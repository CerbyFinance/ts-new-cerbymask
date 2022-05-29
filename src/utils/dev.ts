import { routesNames } from "@router";
import { RouteKey, RouterContextValue } from "@router/types";

import { setAccounts } from "@store";

export const log = (message: any) =>
  chrome.runtime.sendMessage({
    title: "debug-log",
    data: message,
  });

export const resetAll = async (router: RouterContextValue) => {
  setAccounts([]);
  router.redirect(routesNames.SIGN_UP as RouteKey);
};
