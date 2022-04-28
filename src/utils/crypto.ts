import { routesNames } from "@router";
import { RouteKey, RouterContextValue } from "@router/types";

import { connectToRadixApi } from "@chains/radix/api";
import { authenticate, setActiveAddress } from "@chains/radix/store";
import { RadixApiOpts } from "@chains/radix/types";

export const sliceAddress = (address: string) =>
  `${address.slice(0, 16)}...${address.slice(-4)}`;

export const afterAuth = async (
  opts: RadixApiOpts,
  router: RouterContextValue
) => {
  await connectToRadixApi(opts);
  authenticate(true);
  setActiveAddress();
  router.redirect(routesNames.DASHBOARD as RouteKey);
};
