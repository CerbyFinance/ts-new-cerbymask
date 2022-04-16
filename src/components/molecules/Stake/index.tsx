import React, { useState } from "react";

import { sliceAddress } from "@utils";

import { StakeProps } from "./types";

import { Badge, Text } from "@components/atoms";
import * as BADGES from "@components/atoms/Badge/kinds";

import * as S from "./style";
import { ICONS } from "@globalStyle/icons";

const BADGE_COPY_TIMEOUT_DURATION = 2500;

// Stake was built from Wallet
export const Stake = (props: StakeProps) => {
  const { style, className, data, add, reduce } = props;
  const { name, address, ticker, amount, usdEquivalent, coinImg } = data;

  const [badgeTimeout, setBadgeTimeout] = useState<NodeJS.Timeout>();
  const [badgeState, setBadgeState] = useState<string>("");

  const handleCopyAddress = () => {
    const oldBadgeState = badgeState;
    setBadgeState(BADGES.BADGE_ADDRESS_COPIED);

    if (badgeTimeout) {
      clearTimeout(badgeTimeout);
    }
    setBadgeTimeout(
      setTimeout(() => {
        setBadgeState(oldBadgeState);
      }, BADGE_COPY_TIMEOUT_DURATION)
    );
  };

  return (
    <S.Wrapper className={className} style={style} coinImg={coinImg}>
      <Badge type={badgeState} />
      <S.Header>
        <Text
          label={name}
          value={sliceAddress(address)}
          onClick={handleCopyAddress}
        />
      </S.Header>
      <S.Balance>
        <div>
          <span>{ticker}</span> {amount.toLocaleString()}
        </div>
        <div>
          <span>USD</span> {usdEquivalent.toLocaleString()}
        </div>
      </S.Balance>
      <S.Footer>
        <S.FooterAction onClick={() => add(data)}>
          <ICONS.ArrowUp /> Add
        </S.FooterAction>
        <S.FooterAction onClick={() => reduce(data)}>
          <ICONS.ArrowDown /> Reduce
        </S.FooterAction>
      </S.Footer>
    </S.Wrapper>
  );
};
