import React from "react";

import { convertToMainUnit } from "@chains/radix/utils";

import { TokenProps } from "./types";

import * as S from "./style";

export const Token = (props: TokenProps) => {
  const {
    data: { icon, ticker, value, price },
    style,
    className,
  } = props;

  return (
    <S.Wrapper style={style} className={className}>
      <S.TokenInfo>
        <S.TokenIcon>{icon}</S.TokenIcon>
        <div>
          <S.TokenTicker>{ticker}</S.TokenTicker>
          <S.TokenBalance>
            {convertToMainUnit(value)} {ticker}
          </S.TokenBalance>
        </div>
      </S.TokenInfo>
      <S.TokenPrice>${price.toLocaleString()}</S.TokenPrice>
    </S.Wrapper>
  );
};
