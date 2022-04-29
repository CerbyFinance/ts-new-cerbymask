import { forward } from "effector";

import { AccountAddressT } from "@radixdlt/account";

import { buildTokenData } from "@chains/radix/utils";
import { BalanceToken, Token } from "@chains/radix/types";
import {
  fetchPairs,
  fetchActiveAddress,
  fetchTokenBalances,
} from "@chains/radix/api";

import { radix } from "./domain";

export const $authenticated = radix.createStore<boolean>(false);
export const authenticate = radix.createEvent<boolean>();

$authenticated.on(authenticate, (_, auth) => auth);

// Temporary password (for wallet creation)
export const $password = radix.createStore<string>("");
export const setPassword = radix.createEvent<string>();
$password.on(setPassword, (_, password) => password);

// Active address
export const $activeAddress = radix.createStore<AccountAddressT | "">("", {
  name: "$radixActiveAddress",
});
export const setActiveAddress = radix.createEvent("setRadixActiveAddress");
const setActiveAddressFx = radix.createEffect(async () => {
  const address = await fetchActiveAddress();
  return address;
});

$activeAddress.on(setActiveAddressFx.doneData, (_, address) => address);

forward({
  from: setActiveAddress,
  to: setActiveAddressFx,
});

// User tokens
export const $userTokens = radix.createStore<Token[] | null>(null, {
  name: "$radixUserTokens",
});
export const setUserTokens = radix.createEvent<{
  activeAddress: AccountAddressT;
}>("setRadixUserTokens");
const setUserTokensFx = radix.createEffect(
  async (payload: { activeAddress: AccountAddressT }) => {
    const balances = await fetchTokenBalances(payload);
    const mappedBalances: BalanceToken[] =
      balances.account_balances.liquid_balances.map((balance) => {
        const {
          value,
          token_identifier: { rri },
        } = balance;

        return {
          value: value,
          rri: rri.toString(),
          ticker: rri.name.toUpperCase(),
        };
      });

    const pairsData = await fetchPairs(
      mappedBalances.map((balance) => balance.ticker)
    );

    return mappedBalances.map((balance) =>
      buildTokenData(balance, pairsData[balance.ticker])
    );
  }
);

$userTokens.on(setUserTokensFx.doneData, (_, tokens) => tokens);

forward({
  from: setUserTokens,
  to: setUserTokensFx,
});
