import React from "react";

import { Token } from "@components/molecules/types";

import * as S from "./style";

interface TokensListProps {
  tokens: Token[];
  header: string | React.ReactNode;
  style?: React.CSSProperties;
}

export const TokensList = (props: TokensListProps) => {
  const { tokens, header, style } = props;

  return (
    <div style={style}>
      {header && typeof header === "string" ? (
        <S.Title>{header}</S.Title>
      ) : (
        header
      )}
      {tokens.map((token: Token) => (
        <S.Token data={token} key={token.key} />
      ))}
    </div>
  );
};
