import { forward } from "effector";

import { AccountAddressT } from "@radixdlt/account";
import { AccountBalancesEndpoint } from "@radixdlt/application/dist/api/open-api/_types";

import { Action } from "@chains/radix/types";
import { fetchActiveAddress, fetchTokenBalances } from "@chains/radix/api";

import { radix } from "./domain";

// Temporary password (for wallet creation)
export const $password = radix.createStore<string>("");
export const setPassword = radix.createEvent<string>();
$password.on(setPassword, (_, password) => password);

// Active address
export const $activeAddress = radix.createStore<AccountAddressT | null>(null, {
  name: "$radixActiveAddress",
});
export const setActiveAddress = radix.createEvent<Action>(
  "setRadixActiveAddress"
);
const setActiveAddressFx = radix.createEffect(async (action: Action) => {
  const address = await fetchActiveAddress(action);
  return address;
});

$activeAddress.on(setActiveAddressFx.doneData, (_, address) => address);

forward({
  from: setActiveAddress,
  to: setActiveAddressFx,
});

// Balances
export const $balances =
  radix.createStore<AccountBalancesEndpoint.DecodedResponse | null>(null, {
    name: "$radixBalances",
  });
export const setBalances =
  radix.createEvent<Action<{ address: AccountAddressT }>>("setRadixBalances");
const setBalancesFx = radix.createEffect(
  async (action: Action<{ address: AccountAddressT }>) => {
    const balances = await fetchTokenBalances(action);
    return balances;
  }
);

$balances.on(setBalancesFx.doneData, (_, balances) => balances);

forward({
  from: setBalances,
  to: setBalancesFx,
});
