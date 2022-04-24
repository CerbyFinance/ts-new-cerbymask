import React from "react";

import { TokenWithIcon } from "@chains/radix/types";

import { TokensListProps } from "./types";

import * as S from "./style";

export const TokensList = (props: TokensListProps) => {
  const { tokens, header, style } = props;

  return (
    <div style={style}>
      {header && typeof header === "string" ? (
        <S.Title>{header}</S.Title>
      ) : (
        header
      )}
      {tokens.map((token: TokenWithIcon) => (
        <S.Token data={token} key={token.rri} />
      ))}
    </div>
  );
};
