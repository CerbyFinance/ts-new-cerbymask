import React from "react";

import { convertToMainUnit } from "@chains/radix/utils";

import { TokenProps } from "./types";

import { Text } from "@components/atoms";

import * as S from "./style";
import { COLORS } from "@globalStyle/colors";

export const Token = (props: TokenProps) => {
  const {
    data: { icon, ticker, value, dailyChange, price },
    style,
    className,
  } = props;

  let dailyChangeColor = "rgba(255, 255, 255, 0.4)";
  if (dailyChange < 0) {
    dailyChangeColor = COLORS.red;
  } else if (dailyChange > 0) {
    dailyChangeColor = COLORS.green;
  }

  return (
    <S.Wrapper style={style} className={className}>
      <S.TokenInfo>
        <S.TokenIcon>{icon}</S.TokenIcon>
        <Text
          bold
          label={ticker}
          labelStyle={{ fontSize: ".75rem" }}
          value={`${convertToMainUnit(value)}`}
        />
      </S.TokenInfo>
      <S.TokenPrice>
        <span style={{ color: dailyChangeColor }}>
          {dailyChange > 0 ? "+" : null}
          {dailyChange}%
        </span>
        ${price.toLocaleString()}
      </S.TokenPrice>
    </S.Wrapper>
  );
};
