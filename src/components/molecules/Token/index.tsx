import React from "react";

import { TOKENS } from "@tokens";
import { TokenProps } from "./types";

import { Text } from "@components/atoms";

import * as S from "./style";
import { COLORS } from "@globalStyle/colors";

export const Token = (props: TokenProps) => {
  const {
    data: { key, balance, priceChange, currentPrice },
    style,
    className,
  } = props;
  const { name, icon } = TOKENS[key];

  let priceChangeColor = "rgba(255, 255, 255, 0.4)";
  if (priceChange < 0) {
    priceChangeColor = COLORS.red;
  } else if (priceChange > 0) {
    priceChangeColor = COLORS.green;
  }

  return (
    <S.Wrapper style={style} className={className}>
      <S.TokenInfo>
        {icon}
        <Text
          bold
          label={name}
          labelStyle={{ fontSize: ".75rem" }}
          value={balance}
        />
      </S.TokenInfo>
      <S.TokenPrice>
        <span style={{ color: priceChangeColor }}>
          {priceChange > 0 ? "+" : null}
          {priceChange}%
        </span>
        ${currentPrice.toLocaleString()}
      </S.TokenPrice>
    </S.Wrapper>
  );
};
