import { forward } from "effector";

import { AccountAddressT } from "@radixdlt/account";
import { KeystoreT, SimpleExecutedTransaction } from "@radixdlt/application";

import { mapTokenBalances, mapTokenAmounts } from "@chains/radix/utils";
import {
  TokenAmount,
  TokenWithIcon,
  WalletCreationData,
} from "@chains/radix/types";
import {
  fetchPairs,
  fetchActiveAddress,
  fetchTokenBalances,
  getTxHistory,
} from "@chains/radix/api";

import { radix } from "./domain";
import { log } from "@utils";

// Active address
export const $activeAddress = radix.createStore<AccountAddressT | "">("", {
  name: "$radixActiveAddress",
});

export const setActiveAddress = radix.createEvent("setRadixActiveAddress");
const setActiveAddressFx = radix.createEffect(async () => {
  const address = await fetchActiveAddress();
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
export const setUserTokens = radix.createEvent<{
  address: AccountAddressT;
}>("setRadixUserTokens");
const setUserTokensFx = radix.createEffect(
  async (payload: { address: AccountAddressT }) => {
    const balances = await fetchTokenBalances(payload);
    const tokenAmounts: TokenAmount[] = mapTokenAmounts(
      balances.account_balances.liquid_balances
    );
    const pairsData = await fetchPairs(
      tokenAmounts.map((balance) => balance.ticker)
    );
    log("balances");
    log(mapTokenBalances(tokenAmounts, pairsData));
    return mapTokenBalances(tokenAmounts, pairsData);
  }
);

$userTokens.on(setUserTokensFx.doneData, (_, tokens) => tokens);

forward({
  from: setUserTokens,
  to: setUserTokensFx,
});

// Tx history
export const $txHistory = radix.createStore<SimpleExecutedTransaction[]>([]);
export const setTxHistory = radix.createEvent<{
  address: AccountAddressT;
  size: number;
}>();
const setTxHistoryFx = radix.createEffect(
  async (payload: { address: AccountAddressT; size: number }) => {
    const txHistory = await getTxHistory(payload);
    return txHistory;
  }
);

$txHistory.on(setTxHistoryFx.doneData, (_, history) => history);

forward({
  from: setTxHistory,
  to: setTxHistoryFx,
});

// Temporary password storage (for wallet creation)
export const $walletCreationData = radix.createStore<WalletCreationData>({
  password: "",
  mnemonic: [],
  keystore: null,
});
export const setPassword = radix.createEvent<string>();
export const setMnemonic = radix.createEvent<string[]>();
export const setKeystore = radix.createEvent<KeystoreT | null>();
export const resetWalletCreationData = radix.createEvent();
$walletCreationData
  .on(setPassword, (data, password) => ({
    ...data,
    password,
  }))
  .on(setMnemonic, (data, mnemonic) => ({
    ...data,
    mnemonic,
  }))
  .on(setKeystore, (data, keystore) => ({
    ...data,
    keystore,
  }))
  .reset(resetWalletCreationData);

$walletCreationData.watch((data) => {
  log("wallet creation data");
  log(data);
});
