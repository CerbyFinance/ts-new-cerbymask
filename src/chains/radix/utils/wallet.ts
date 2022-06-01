import { fetchUsdTo } from "@store";
import { waitUntilDataLoaded } from "@chains/radix/api";
import {
  setAccountsFx,
  setActiveAccountFx,
  setActiveAddressFx,
  setTxHistoryFx,
  setUserTokensFx,
} from "@chains/radix/store";

export const initWallet = async () => {
  await fetchUsdTo();

  await setActiveAccountFx();
  await setActiveAddressFx();
  await setUserTokensFx();
  await setTxHistoryFx();
  await setAccountsFx();
  await waitUntilDataLoaded();
};
