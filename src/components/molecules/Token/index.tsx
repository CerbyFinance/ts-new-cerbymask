import React from "react";
import { useStore } from "effector-react";

import { CURRENCIES_SYMBOLS } from "@utils";

import { $currentCurrency, $usdTo } from "@store";

import { convertToMainUnit } from "@chains/radix/utils";

import { TokenProps } from "./types";

import * as S from "./style";

export const Token = (props: TokenProps) => {
  const {
    data: { icon, ticker, balance, usdBalance },
    style,
    className,
  } = props;

  const currentCurrency = useStore($currentCurrency);
  const usdTo = useStore($usdTo);

  return (
    <S.Wrapper style={style} className={className}>
      <S.TokenInfo>
        <S.TokenIcon>{icon}</S.TokenIcon>
        <div>
          <S.TokenTicker>{ticker}</S.TokenTicker>
          <S.TokenBalance>
            {convertToMainUnit(balance)} {ticker}
          </S.TokenBalance>
        </div>
      </S.TokenInfo>
      <S.TokenPrice>
        {CURRENCIES_SYMBOLS[currentCurrency]}
        {(usdBalance * usdTo[currentCurrency]).toLocaleString()}
      </S.TokenPrice>
    </S.Wrapper>
  );
};
