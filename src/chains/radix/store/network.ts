import { forward } from "effector";

import { Network } from "@chains/radix/types";
import { NETWORKS_LIST } from "@chains/radix/crypto";

import { radix } from "./domain";

export const $network = radix.createStore<Network>(NETWORKS_LIST.stokenet, {
  name: "$radixSettings",
});
export const setNetwork = radix.createEvent<Network>("setRadixNetwork");
const setNetworkFx = radix.createEffect(async (network: Network) => {
  await chrome.storage.local.set({ network });
  return network;
});
$network.on(setNetwork, (_, network) => network);

forward({
  from: setNetwork,
  to: setNetworkFx,
});
