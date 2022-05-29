import BigNumber from "bignumber.js";
import { UInt256 } from "@radixdlt/uint256";

export const convertToMainUnit = (balance: UInt256) =>
  new BigNumber(balance.toString())
    .dividedBy(10 ** 18)
    .toFixed()
    .toString();

export const convertToUsd = (balance: UInt256, price: number) => {
  const bnValue = new BigNumber(balance.toString()).dividedBy(10 ** 18);
  return bnValue.toNumber() * price;
};
