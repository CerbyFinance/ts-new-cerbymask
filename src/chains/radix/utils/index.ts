import BigNumber from "bignumber.js";

import { UInt256 } from "@radixdlt/uint256";
import { KeystoreT, StakePosition } from "@radixdlt/application";

import { Stake } from "@types";

import { log } from "@utils";

import { routesNames } from "@router";
import { RouteKey, RouterContextValue } from "@router/types";

import {
  RadixApiOpts,
  BalanceToken,
  ExchangeToken,
  Token,
  Network,
} from "@chains/radix/types";
import { connectToRadixApi } from "@chains/radix/api";
import { authenticate, setActiveAddress } from "@chains/radix/store";

export const loadKeystore = async () => {
  const result = await chrome.storage.local.get("keystore");
  log(`Got keystore: ${JSON.stringify(result.keystore, null, "\t")}`);
  return result.keystore as KeystoreT;
};

export const setStorage = async (key: string, value: any) => {
  const { radix: radixStorage } = await chrome.storage.local.get("radix");
  await chrome.storage.local.set({ radix: { ...radixStorage, [key]: value } });
};

export const convertToMainUnit = (balance: UInt256) =>
  new BigNumber(balance.toString())
    .dividedBy(10 ** 18)
    .toFixed(2)
    .toString();

export const convertToUsd = (balance: UInt256, price: number) => {
  const bnValue = new BigNumber(balance.toString()).dividedBy(10 ** 18);
  return bnValue.toNumber() * price;
};

export const buildTokenData = (
  token: BalanceToken,
  exchangeData: ExchangeToken
): Token => ({
  ...token,
  ...exchangeData,
  usdBalance: convertToUsd(token.value, exchangeData.price),
});

export const sliceAddress = (address: string) =>
  `${address.slice(0, 16)}...${address.slice(-4)}`;

export const afterAuth = async (
  opts: RadixApiOpts,
  router: RouterContextValue
) => {
  await connectToRadixApi(opts);
  authenticate(true);
  setActiveAddress();
  router.redirect(routesNames.DASHBOARD as RouteKey);
};

export const formatXrdStakes = (
  positions: StakePosition[],
  address: string,
  price: number,
  network: Network
): Stake[] =>
  positions.map(({ validator, amount }) => ({
    ticker: "XRD",
    rri: network.xrd_rri,
    address,
    usdEquivalent: convertToUsd(amount, price),
    amount: convertToMainUnit(amount),
    validator: validator.toString(),
  }));
