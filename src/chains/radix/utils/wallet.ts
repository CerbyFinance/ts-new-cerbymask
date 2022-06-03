import toast from "react-hot-toast";

import { routesNames } from "@router";
import { RouteKey, RouterContextValue } from "@router/types";

import { authenticate, fetchUsdTo, setLockTimeout } from "@store";
import { fetchNetworkId, login, waitUntilDataLoaded } from "@chains/radix/api";
import {
  getStakesFx,
  getValidatorsFx,
  restoreAccountsFx,
  selectAccount,
  setAccountsFx,
  setActiveAccountFx,
  setActiveAddressFx,
  setNetwork,
  setTxHistoryFx,
  setUserTokensFx,
} from "@chains/radix/store";

import { getStorage, setStorage } from "./storage";
import { log } from "@utils";

export const fetchAccounts = async () => {
  try {
    await restoreAccountsFx();
  } catch {
    await setAccountsFx();
  }
};

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

  const network = await fetchNetworkId();
  setNetwork(network);

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
  const { sessionUntil, showedExpired } = await getStorage([
    "sessionUntil",
    "showedExpired",
  ]);
  if (Date.now() < sessionUntil) {
    await login();
    await fetchAccounts();
    await initWallet();
    authenticate(true);
    router.redirect(routesNames.DASHBOARD as RouteKey);
  } else if (sessionUntil && Date.now() >= sessionUntil && !showedExpired) {
    authenticate(false);
    toast.error("Session expired");
    router.redirect(routesNames.SIGN_IN as RouteKey);
    setStorage({
      showedExpired: true,
    });
  }
};
