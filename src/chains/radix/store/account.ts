import { forward, restore } from "effector";

import { AccountAddressT } from "@radixdlt/account";
import {
  AccountT,
  SimpleExecutedTransaction,
  WalletT,
} from "@radixdlt/application";

import {
  mapTokenBalances,
  mapTokenAmounts,
  getAccountsIndex,
} from "@chains/radix/utils";
import { TokenAmount, TokenWithIcon } from "@chains/radix/types";
import {
  fetchPairs,
  fetchActiveAddress,
  fetchTokenBalances,
  getTxHistory,
  fetchActiveAccount,
  fetchNetworkId,
  fetchAccountsForNetwork,
} from "@chains/radix/api";

import { radix } from "./domain";
import { log } from "@utils";
import { firstValueFrom } from "rxjs";

export const setWallet = radix.createEvent<WalletT | null>();
export const $wallet = restore(setWallet, null);

export const $activeAccount = radix.createStore<AccountT | null>(null, {
  name: "$radixActiveAddress",
});

export const setActiveAccount = radix.createEvent("setRadixActiveAccount");
export const setActiveAccountFx = radix.createEffect(async () => {
  const account = await fetchActiveAccount();
  return account;
});
forward({
  from: setActiveAccount,
  to: setActiveAccountFx,
});

export const $activeAddress = radix.createStore<AccountAddressT | "">("", {
  name: "$radixActiveAddress",
});

export const setActiveAddress = radix.createEvent("setRadixActiveAddress");
export const setActiveAddressFx = radix.createEffect(async () => {
  const address = await fetchActiveAddress();
  log("address");
  log(address);
  return address;
});
forward({
  from: setActiveAddress,
  to: setActiveAddressFx,
});

$activeAddress.on(setActiveAddressFx.doneData, (_, address) => address);

// User tokens
export const $userTokens = radix.createStore<TokenWithIcon[]>([], {
  name: "$radixUserTokens",
});
export const setUserTokens = radix.createEvent("setRadixUserTokens");
export const setUserTokensFx = radix.createEffect(async () => {
  const address = await fetchActiveAddress();
  const balances = await fetchTokenBalances({ address });
  const tokenAmounts: TokenAmount[] = mapTokenAmounts(
    balances.account_balances.liquid_balances
  );
  const pairsData = await fetchPairs(
    tokenAmounts.map((balance) => balance.ticker)
  );
  log("balances");
  log(mapTokenBalances(tokenAmounts, pairsData));
  return mapTokenBalances(tokenAmounts, pairsData);
});

$userTokens.on(setUserTokensFx.doneData, (_, tokens) => tokens);

forward({
  from: setUserTokens,
  to: setUserTokensFx,
});

// Tx history
export const $txHistory = radix.createStore<SimpleExecutedTransaction[]>([]);
export const setTxHistory = radix.createEvent();
export const setTxHistoryFx = radix.createEffect(async () => {
  const address = await fetchActiveAddress();
  const txHistory = await getTxHistory({
    address,
    size: 30,
  });
  return txHistory;
});

$txHistory.on(setTxHistoryFx.doneData, (_, history) => history);

forward({
  from: setTxHistory,
  to: setTxHistoryFx,
});

export const $accounts = radix.createStore<AccountT[]>([]);
export const setAccounts = radix.createEvent();
export const setAccountsFx = radix.createEffect(async () => {
  const network = await fetchNetworkId();
  const accounts: any = await fetchAccountsForNetwork(network);
  if (accounts) {
    return accounts.all;
  }
  return [];
});
$accounts.on(setAccountsFx.doneData, (_, accounts) => accounts);

forward({
  from: setAccounts,
  to: setAccountsFx,
});

export const selectAccount = radix.createEvent<AccountT | null>();
export const $selectedAccount = restore(selectAccount, null);
