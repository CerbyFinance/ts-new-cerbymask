import { forward } from "effector";
import { Network } from "@radixdlt/application";

import { DEFAULT_NETWORK } from "@chains/radix/crypto";
import { setStorage } from "@chains/radix/utils";

import { radix } from "./domain";

export const $network = radix.createStore<Network>(DEFAULT_NETWORK, {
  name: "$radixSettings",
});
export const setNetwork = radix.createEvent<Network>("setRadixNetwork");
const setNetworkFx = radix.createEffect(async (network: Network) => {
  await setStorage({ network });
  return network;
});
$network.on(setNetwork, (_, network) => network);

forward({
  from: setNetwork,
  to: setNetworkFx,
});
