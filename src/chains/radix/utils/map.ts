import { MnemomicT } from "@radixdlt/application";
import { Decoded } from "@radixdlt/application/dist/api/open-api/_types";

import { TokenAmount, ExchangeData, TokenWithIcon } from "@chains/radix/types";

import { convertToUsd } from "./convert";

import { TOKEN_ICONS } from "@globalStyle";

export const mapTokenAmounts = (
  amounts: Decoded.TokenAmount[]
): TokenAmount[] =>
  amounts.map((balance) => {
    const {
      value,
      token_identifier: { rri },
    } = balance;

    return {
      balance: value,
      rri: rri.toString(),
      ticker: rri.name.toUpperCase(),
    };
  });

export const mapTokenBalances = (
  tokens: TokenAmount[],
  exchangeData: ExchangeData
): TokenWithIcon[] =>
  tokens.map((token) => {
    const exchangeDataForToken = exchangeData[token.ticker];
    return {
      ...token,
      ...exchangeDataForToken,
      usdBalance: convertToUsd(token.balance, exchangeDataForToken.price),
      icon: TOKEN_ICONS.XRD || null,
    };
  });

export const mapMnemonic = (mnemonic: MnemomicT) =>
  mnemonic.toString().split(" ");
