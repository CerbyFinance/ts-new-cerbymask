import React from "react";

import { convertToMainUnit } from "@chains/radix/utils";

import { TransactionProps } from "./types";

import { COLORS } from "@globalStyle/colors";
import * as S from "./style";

// Inherited from Token molecule
export const Transaction = (props: TransactionProps) => {
  const {
    data: { ticker, icon, amount, usdAmount, type },
    style,
    className,
  } = props;

  return (
    <S.Wrapper style={style} className={className}>
      <S.TxInfo>
        <S.TxIcon>{icon}</S.TxIcon>
        <div>
          <S.TxTicker>{ticker}</S.TxTicker>
          <S.TxBalance>
            {convertToMainUnit(amount)} {ticker}
          </S.TxBalance>
        </div>
      </S.TxInfo>
      <S.TxPrice style={{ color: type === "send" ? COLORS.red : COLORS.green }}>
        ${usdAmount.toLocaleString()}
      </S.TxPrice>
    </S.Wrapper>
  );
};
