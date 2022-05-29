import { sha256 } from "js-sha256";
import toast from "react-hot-toast";

import { log } from "@utils";

import { routesNames } from "@router";
import { RouteKey, RouterContextValue } from "@router/types";

import { authenticate } from "@store";

import { RadixApiOpts } from "@chains/radix/types";
import { connectToRadixApi, fetchActiveAddress } from "@chains/radix/api";
import { setActiveAddress } from "@chains/radix/store";

export * from "./convert";
export * from "./map";
export * from "./storage";

export const sliceAddress = (address: string, end?: number) =>
  `${address.slice(0, end || 12)}...${address.slice(-4)}`;

export const afterAuth = async (
  opts: RadixApiOpts,
  router: RouterContextValue
) => {
  const { password } = await chrome.storage.local.get("password");
  const hashedPassword = sha256(opts.password);
  if (password !== hashedPassword) {
    toast.error("Invalid password");
    throw new Error("Invalid password");
  }

  try {
    await connectToRadixApi({ ...opts, password: opts.password });
    authenticate(true);
    setActiveAddress();
    router.redirect(routesNames.DASHBOARD as RouteKey);
    return await fetchActiveAddress();
  } catch (err) {
    log(err);
  }
};
