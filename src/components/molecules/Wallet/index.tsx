import React from "react";

import { Text } from "@components/atoms";

import * as S from "./style";
import { ICONS } from "@globalStyle/icons";

export const Wallet = () => {
  return (
    <S.Wrapper>
      <S.Header>
        <Text label="My wallet" value="0x89c9...d602" />
        <S.HeaderActions>
          <ICONS.Refresh />
          <ICONS.Bin />
        </S.HeaderActions>
      </S.Header>
      <S.Balance>
        <span>USD</span> 2852,49
      </S.Balance>
      <S.Footer>
        <S.FooterAction>
          <ICONS.Stake /> Stake
        </S.FooterAction>
        <S.FooterAction>
          <ICONS.ArrowDown /> Receive
        </S.FooterAction>
        <S.FooterAction>
          <ICONS.ArrowUp /> Send
        </S.FooterAction>
      </S.Footer>
    </S.Wrapper>
  );
};
