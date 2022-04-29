import React, { useState } from "react";

import { sliceAddress } from "@chains/radix/utils";

import { StakeProps } from "./types";

import { Badge, Text } from "@components/atoms";
import * as BADGES from "@components/atoms/Badge/kinds";

import * as S from "./style";
import { ICONS } from "@globalStyle/icons";

const BADGE_COPY_TIMEOUT_DURATION = 2500;

// Stake was built from Wallet
export const Stake = (props: StakeProps) => {
  const { style, className, data, onUnstake } = props;
  const { ticker, address, amount, usdEquivalent, isPending } = data;

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
    <S.Wrapper className={className} style={style}>
      <Badge type={badgeState} />
      <S.Header>
        <Text value={sliceAddress(address)} onClick={handleCopyAddress} />
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
        {isPending && <div>Pending stake</div>}
        {!isPending && (
          <S.FooterAction onClick={() => onUnstake(data)}>
            <ICONS.ArrowDown /> Unstake
          </S.FooterAction>
        )}
      </S.Footer>
    </S.Wrapper>
  );
};
