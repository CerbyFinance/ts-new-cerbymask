import React from "react";
import { useStore, useStoreMap } from "effector-react";
import { ActionType } from "@radixdlt/application";

import { CURRENCIES_SYMBOLS } from "@utils";

import { $currentCurrency, $usdTo } from "@store";

import { convertToMainUnit, convertToUsd } from "@chains/radix/utils";
import { $activeAddress, XRD_PRICE } from "@chains/radix/store";

import { TransactionProps } from "./types";

import { COLORS, TOKEN_ICONS } from "@globalStyle";
import * as S from "./style";

// Inherited from Token molecule
export const Transaction = (props: TransactionProps) => {
  const {
    data: { actions },
    style,
    className,
  } = props;

  const activeAddress = useStoreMap($activeAddress, (addr) => addr.toString());
  const currentCurrency = useStore($currentCurrency);
  const usdTo = useStore($usdTo);

  // just taking first action
  const action = actions[0];
  const { type } = action;
  if (type !== ActionType.TOKEN_TRANSFER) {
    return <S.Wrapper>Unsupported tx type</S.Wrapper>;
  }

  const { rri, amount, to_account } = action;
  const ticker = rri.name.toUpperCase();
  const usdAmount = convertToUsd(amount, XRD_PRICE);
  const isRecipient = to_account.toString() === activeAddress;
  // rendering only transfers
  return (
    <S.Wrapper style={style} className={className}>
      <S.TxInfo>
        <S.TxIcon>{TOKEN_ICONS[ticker]}</S.TxIcon>
        <div>
          <S.TxTicker>{ticker}</S.TxTicker>
          <S.TxBalance
            style={{ color: isRecipient ? COLORS.green : COLORS.red }}
          >
            {isRecipient ? "+" : "-"}
            {convertToMainUnit(amount)} {ticker}
          </S.TxBalance>
        </div>
      </S.TxInfo>
      <S.TxPrice>
        {CURRENCIES_SYMBOLS[currentCurrency]}
        {(usdAmount * usdTo[currentCurrency]).toLocaleString()}
      </S.TxPrice>
    </S.Wrapper>
  );
};
