import toast from "react-hot-toast";

import { routesNames } from "@router";
import { RouteKey, RouterContextValue } from "@router/types";

import { authenticate, fetchUsdTo, setLockTimeout } from "@store";
import { login, waitUntilDataLoaded } from "@chains/radix/api";
import {
  getStakesFx,
  getValidatorsFx,
  restoreAccountsFx,
  selectAccount,
  setActiveAccountFx,
  setActiveAddressFx,
  setTxHistoryFx,
  setUserTokensFx,
} from "@chains/radix/store";

import { getStorage } from "./storage";

export const fetchAllData = async () => {
  await setActiveAccountFx();
  await setActiveAddressFx();
  await setUserTokensFx();
  await setTxHistoryFx();
  await getValidatorsFx();
  await getStakesFx();
  await waitUntilDataLoaded();
};

export const initWallet = async () => {
  await fetchUsdTo();

  const { selectedAddress, autoLockTimeout } = await getStorage([
    "selectedAddress",
    "autoLockTimeout",
  ]);
  await selectAccount(selectedAddress);
  await setLockTimeout(autoLockTimeout);

  await fetchAllData();
  authenticate(true);
};

export const autologin = async (router: RouterContextValue) => {
  const { sessionUntil } = await getStorage(["sessionUntil"]);
  if (Date.now() < sessionUntil) {
    await login();
    await restoreAccountsFx();
    await initWallet();
    authenticate(true);
    router.redirect(routesNames.DASHBOARD as RouteKey);
  } else if (sessionUntil !== null && Date.now() >= sessionUntil) {
    authenticate(false);
    toast.error("Session expired");
    router.redirect(routesNames.SIGN_IN as RouteKey);
  }
};
