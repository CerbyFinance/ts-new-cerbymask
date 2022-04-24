import BigNumber from "bignumber.js";

import { UInt256 } from "@radixdlt/uint256";
import { KeystoreT } from "@radixdlt/application";

import { log } from "@utils";

import { BalanceToken, ExchangeToken, Token } from "@chains/radix/types";

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
  new BigNumber(balance.toString()).dividedBy(10 ** 18).toString();

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
