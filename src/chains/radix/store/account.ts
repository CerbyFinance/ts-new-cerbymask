import { forward, restore, sample } from "effector";

import { AccountAddressT } from "@radixdlt/account";
import {
  AccountsT,
  AccountT,
  Network,
  SimpleExecutedTransaction,
  WalletT,
} from "@radixdlt/application";

import {
  mapTokenBalances,
  mapTokenAmounts,
  setStorage,
} from "@chains/radix/utils";
import { TokenAmount, TokenWithIcon } from "@chains/radix/types";
import {
  fetchActiveAddress,
  fetchTokenBalances,
  getTxHistory,
  fetchActiveAccount,
  fetchAccounts,
  restoreLocalHDAccountsToIndex,
  switchAccount,
  fetchNetworkId,
} from "@chains/radix/api";

import { radix } from "./domain";
import { log } from "@utils";
import { getPairsDataFx } from "./token";

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
  const pairsData = await getPairsDataFx(
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

export const $accounts = radix.createStore<AccountsT | null>(null);
export const setAccounts = radix.createEvent();
export const setAccountsFx = radix.createEffect(async () => {
  const accounts = await fetchAccounts();
  if (accounts) {
    return accounts;
  }
  return null;
});
export const restoreAccounts = radix.createEvent();
export const restoreAccountsFx = radix.createEffect(async () => {
  const network = await fetchNetworkId();
  const accounts = await restoreLocalHDAccountsToIndex(network);
  return accounts;
});
$accounts.on(
  [setAccountsFx.doneData, restoreAccountsFx.doneData],
  (_, accounts) => accounts
);

forward({
  from: setAccounts,
  to: setAccountsFx,
});
forward({
  from: restoreAccounts,
  to: restoreAccountsFx,
});

export const $selectedAccount = radix.createStore<AccountT | null>(null);
export const selectAccount = radix.createEvent<string>();
export const selectAccountFx = radix.createEffect(
  async ({
    accounts,
    address,
  }: {
    accounts: AccountsT | null;
    address: string;
  }) => {
    if (accounts) {
      const activeAddress = await fetchActiveAddress();
      const newAccount = accounts.all.find(
        (account) => account.address.toString() === address
      );

      if (newAccount) {
        if (activeAddress.toString() !== address) {
          await switchAccount(newAccount);
        }

        await setStorage({ selectedAddress: address });
        return newAccount;
      }

      return null;
    }

    return null;
  }
);

$selectedAccount.on(selectAccountFx.doneData, (_, account) => account);

sample({
  source: $accounts,
  clock: selectAccount,
  target: selectAccountFx,
  fn: (accounts, address) => ({ accounts, address }),
});
